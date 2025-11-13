import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function getChatResponse(
  message: string,
  language: 'en' | 'ar',
  context?: string
) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

  const systemPrompt = language === 'ar'
    ? `أنت مساعد متجر أثاث ذكي لمتجر "Cozy Corner". مهمتك:
- مساعدة العملاء في اختيار الأثاث المناسب
- الإجابة عن الأسعار والمواصفات
- تقديم توصيات بناءً على ذوق العميل
- المساعدة في تتبع الطلبات
- كن ودودًا ومحترفًا ومفيدًا

معلومات المتجر:
- الاسم: Cozy Corner (ركن مريح)
- الشعار: اجعل منزلك دافئًا ومريحًا
- الأنماط: عصري، كلاسيكي، بسيط، ريفي
- الألوان: محايد، جريء، أخضر طبيعي، داكن
- التوصيل: مجاني للطلبات فوق 500 دينار
- الدفع: بطاقة، PayPal، الدفع عند الاستلام`
    : `You are a smart furniture store assistant for "Cozy Corner". Your role:
- Help customers choose the right furniture
- Answer questions about prices and specifications
- Provide recommendations based on customer taste
- Help track orders
- Be friendly, professional, and helpful

Store information:
- Name: Cozy Corner
- Tagline: Make your home feel warm and inviting
- Styles: Modern, Classic, Minimalist, Rustic
- Colors: Neutral, Bold, Earthy Green, Dark
- Free shipping on orders over 500 JOD
- Payment: Card, PayPal, Cash on Delivery`

  const prompt = context
    ? `${systemPrompt}\n\nPrevious conversation:\n${context}\n\nCustomer: ${message}`
    : `${systemPrompt}\n\nCustomer: ${message}`

  const result = await model.generateContent(prompt)
  const response = await result.response
  return response.text()
}
