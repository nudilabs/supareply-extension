import { ENV } from "@/utils/Env"

import type { PlasmoMessaging } from "@plasmohq/messaging"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const respMsg = await fetch(`${ENV.API_URL}complete`, {
    method: "POST",
    body: JSON.stringify(req.body)
  })
  const message = await respMsg.json()

  res.send({
    message: JSON.parse(message)
  })
}

export default handler
