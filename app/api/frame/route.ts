import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../config';
import { createTextAndImageOverlay } from '../../utils/createTextAndImageOverlay';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  let accountAddress: string | undefined = '';

  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });

  if (isValid) {
    accountAddress = message.interactor.verified_accounts[0];
  }

  let curr = 'Salut';

  if (message?.button === 1) {
    curr = 'Aurevoir';
  }

  const { textTest } = await createTextAndImageOverlay(curr);

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        { label: textTest},
        { label: 'TEAM A', action: 'post' },
        { label: 'TEAM B', action: 'post' },
      ],
      image: {
        src: `${NEXT_PUBLIC_URL}/park-1.png`,
      },
      postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
    }),
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
