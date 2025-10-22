import axios from "axios"

const telegramBotToken = import.meta.env.VITE_APP_BOT_TOKEN
const chatId = import.meta.env.VITE_APP_BOT_USER_ID

export async function sendTelegramMessage(message: string | object, isSend: boolean = true, chat_id: number = chatId) {
  try {
    if (isSend) {
      await axios.post(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
        chat_id: chatId,
        text: typeof message === 'string' ? message : JSON.stringify(message),
      })
    }
  }
  catch (error: any) {
    const response = error.response
    console.error('Error sending message:', response ? response.data : error.message)
  }
}
