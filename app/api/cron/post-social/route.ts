import { NextResponse } from 'next/server';
import { generateDailySocialSlots } from '@/lib/social-post-generator';

export async function GET(request: Request) {
  const fbToken = process.env.FB_PAGE_ACCESS_TOKEN;
  const fbPageId = process.env.FB_PAGE_ID;

  const slots = generateDailySocialSlots();
  // Pick slot based on current UTC hour
  const currentHour = new Date().getUTCHours();
  let selectedSlot = slots[0];
  if (currentHour >= 12 && currentHour < 17) {
    selectedSlot = slots[1];
  } else if (currentHour >= 17) {
    selectedSlot = slots[2];
  }

  // If Meta API Token is configured, dispatch directly to Facebook Page Feed
  if (fbToken && fbPageId) {
    try {
      const fbResponse = await fetch(`https://graph.facebook.com/v19.0/${fbPageId}/feed`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: selectedSlot.copyText,
          link: selectedSlot.directUrl,
          access_token: fbToken
        })
      });
      const fbData = await fbResponse.json();
      return NextResponse.json({
        success: true,
        automatedMetaPost: true,
        slotPosted: selectedSlot.theme,
        postId: fbData.id,
        timestamp: new Date().toISOString()
      });
    } catch (err: any) {
      return NextResponse.json({
        success: false,
        error: err.message,
        fallbackSlot: selectedSlot
      }, { status: 500 });
    }
  }

  // Otherwise return generated slot payload for Admin Studio
  return NextResponse.json({
    success: true,
    automatedMetaPost: false,
    message: 'Meta API token not configured. Generated daily social slots for Admin Studio dispatch.',
    slots,
    activeSlotForNow: selectedSlot,
    timestamp: new Date().toISOString()
  });
}
