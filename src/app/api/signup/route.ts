import { NextRequest, NextResponse } from 'next/server';
import { signUp } from '@/lib/api/auth/signUp';
import { SignupFormData } from '../../../lib/validation/signupSchema';

export async function POST(req: NextRequest) {
    try {
        const data: SignupFormData = await req.json();

        const result = await signUp(data);
        if (result.error) {
            return NextResponse.json(result, { status: 400 });
        }
        return NextResponse.json(result, { status: 200 });
    } catch (err) {
        return NextResponse.json(
            {
                user: null,
                session: null,
                error: {
                    message: 'Unexpected error during sign up',
                    details: err instanceof Error ? err.message : String(err),
                },
            },
            { status: 500 }
        );
    }
}
