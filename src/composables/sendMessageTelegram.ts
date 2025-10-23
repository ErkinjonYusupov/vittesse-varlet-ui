import type { IData } from '~/types'
import axios from 'axios'

const telegramBotToken = import.meta.env.VITE_APP_BOT_TOKEN
const chatId = import.meta.env.VITE_APP_BOT_USER_ID

export async function sendTelegramMessage(message: string | object, isSend: boolean = true, chat_id: number = chatId) {
  try {
    if (isSend) {
      await axios.post(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
        chat_id,
        parse_mode: 'HTML',
        text: typeof message === 'string' ? message : JSON.stringify(message),
      })
    }
  }
  catch (error: any) {
    const response = error.response
    console.error('Error sending message:', response ? response.data : error.message)
  }
}

export async function sendTelegramOrder(
  items: IData[],
  region: string,
  city: string,
  phone: string,
  description: string,
  total: number,
  user: string,
) {
  const message = `<b>🆕 YANGI BUYURTMA #${Date.now()}</b>

📋 <b>Mahsulotlar:</b>
${items.map((el, i) => `${i + 1}. ${el.product.name}<br>   ×${el.count} | $${el.product.price}`).join('<br>')}

💰 <b>Jami: $${total}</b>

👤 <b>Mijoz ma'lumotlari:</b>
🌍 ${region} viloyati
🏘️ ${city}
🏘️ ${description}
📱 <b>+998 ${phone}</b>
📱 <b>${user}</b>

⏰ <code>${new Date().toLocaleString('uz-UZ')}</code>`

  const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`

  try {
    const response = await axios.post(url, {
      chat_id: chatId,
      parse_mode: 'HTML',
      text: message,
      disable_web_page_preview: true,
    })

    return response
  }
  catch (error) {
    console.error('Telegram xato:', error)
    return false
  }
}
