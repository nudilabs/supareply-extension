import { ENV } from "@/utils/Env"

import type { PlasmoMessaging } from "@plasmohq/messaging"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const respMsg = await fetch(`${ENV.API_URL}complete`, {
    method: "POST",
    body: JSON.stringify(req.body.input)
  })
  const message = await respMsg.json()
  console.log("message: ", message)

  res.send({
    message: JSON.parse(message)
  })
}

export default handler
