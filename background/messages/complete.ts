import type { PlasmoMessaging } from "@plasmohq/messaging"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  console.log("req.body: ", req.body.input)
  const respMsg = await fetch("http://localhost:3000/api/complete", {
    method: "POST",
    body: JSON.stringify(req.body.input)
  })
  const message = await respMsg.json()
  console.log("message: ", message)

  res.send({
    message
  })
}

export default handler
