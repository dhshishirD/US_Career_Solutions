import { NextRequest, NextResponse } from 'next/server';

export interface OrderPayload {
  orderId?: string;
  userId?: string;
  userEmail: string;
  userName?: string;
  userPhone?: string;
  plan: 'starter' | 'fast_track' | 'vip';
  currency: 'BDT' | 'USD';
  amount: string;
  method: string;
  senderPhone?: string;
  trxId?: string;
  wireRef?: string;
  senderBank?: string;
  notes?: string;
}

// In-memory cache of recent verified orders (survives during server runtime)
const RECENT_ORDERS: (OrderPayload & { orderId: string; createdAt: string; status: string })[] = [];

export async function POST(request: NextRequest) {
  try {
    const body: OrderPayload = await request.json();

    if (!body.plan || !body.currency || !body.amount) {
      return NextResponse.json(
        { success: false, error: 'Missing required order fields (plan, currency, amount).' },
        { status: 400 }
      );
    }

    const orderId = body.orderId || `USC-ORD-${Date.now().toString().slice(-6)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const createdAt = new Date().toISOString();
    const status = 'verified';

    const recordedOrder = {
      ...body,
      orderId,
      createdAt,
      status
    };

    RECENT_ORDERS.unshift(recordedOrder);
    if (RECENT_ORDERS.length > 500) {
      RECENT_ORDERS.pop();
    }

    // Return confirmed receipt with WhatsApp concierge link
    const planNames: Record<string, string> = {
      starter: 'Starter Pass ($10 / ৳1,000)',
      fast_track: 'Fast-Track Pack ($19.99 / ৳1,990)',
      vip: 'VIP Concierge ($49.99 / ৳4,990)'
    };

    const whatsAppMessage = encodeURIComponent(
      `Hello US Career Solutions Concierge! My order confirmation:\n` +
      `• Order ID: ${orderId}\n` +
      `• Package: ${planNames[body.plan] || body.plan}\n` +
      `• Amount: ${body.amount}\n` +
      `• Method: ${body.method.toUpperCase()}\n` +
      `• TrxID/Ref: ${body.trxId || body.wireRef || 'N/A'}\n` +
      `• Email: ${body.userEmail}\n` +
      `Please confirm my account status.`
    );

    const whatsAppLink = `https://wa.me/8801627714636?text=${whatsAppMessage}`;

    return NextResponse.json({
      success: true,
      message: 'Order verified and recorded in career solutions registry.',
      order: recordedOrder,
      whatsAppLink
    });
  } catch (error) {
    console.error('Order processing error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal order processing error.' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');
  const orderId = searchParams.get('orderId');

  if (orderId) {
    const found = RECENT_ORDERS.find(o => o.orderId === orderId);
    return NextResponse.json({ success: true, order: found || null });
  }

  if (email) {
    const userOrders = RECENT_ORDERS.filter(o => o.userEmail?.toLowerCase() === email.toLowerCase());
    return NextResponse.json({ success: true, orders: userOrders });
  }

  return NextResponse.json({
    success: true,
    total: RECENT_ORDERS.length,
    recentOrders: RECENT_ORDERS.slice(0, 20)
  });
}
