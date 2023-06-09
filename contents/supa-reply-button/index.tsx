import cssText from "data-text:~style.css"
import type {
  PlasmoCSConfig,
  PlasmoGetInlineAnchor,
  PlasmoMountShadowHost
} from "plasmo"
import { useEffect, useState } from "react"
import { BsLightningChargeFill } from "react-icons/bs"

import { sendToBackground } from "@plasmohq/messaging"

export const config: PlasmoCSConfig = {
  matches: ["https://twitter.com/*"]
}

export const getInlineAnchor: PlasmoGetInlineAnchor = () =>
  document.querySelector('[data-testid="toolBar"] > div')

export const getShadowHostId = () => "supareply"

export const mountShadowHost: PlasmoMountShadowHost = ({
  shadowHost,
  anchor
}) => {
  anchor.element.appendChild(shadowHost)
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const SupaReplyButton = () => {
  const handleClick = async () => {
    const isContentEmpty =
      document.querySelector('[data-text="true"]').innerHTML === ""
    if (isContentEmpty) {
      alert("You need to type something before you can use supareply!")
    }
    const tweetTextElements = document.querySelector(
      '[data-testid="tweetText"]'
    )
    let tweetText = "Hello world!"
    if (tweetTextElements) {
      const replyTextElement = document.querySelector('span[data-text="true"]')
      console.log("replyTextElement: ", replyTextElement)

      // const resp = await sendToBackground({
      //   name: "complete",
      //   body: {
      //     input: tweetTextElements
      //   }
      // })
      console.log("tweetTextElements: ", tweetTextElements.innerText)
      await sendToBackground({
        name: "complete",
        body: {
          input: tweetTextElements.innerText
        }
      }).then((resp) => {
        console.log("resp: ", resp.message)
        // const data = await resp.json()
        tweetText = JSON.parse(resp.message).text
      })

      const spanElement = document.createElement("span")
      spanElement.textContent = tweetText
      spanElement.setAttribute("data-text", "true")
      console.log("resp: ", tweetText)
      if (replyTextElement.parentNode) {
        replyTextElement.parentNode.replaceChild(spanElement, replyTextElement)
        const editedReplyTextElement = document.querySelector(
          'span[data-text="true"]'
        )

        const event = new Event("input", { bubbles: true })
        // @ts-ignore
        editedReplyTextElement.click()
        editedReplyTextElement.dispatchEvent(event)
      }
    }
  }
  const shouldRenderButton =
    document.querySelector('h2[aria-level="2"] > span')?.textContent === "Tweet"

  if (!shouldRenderButton) {
    return null
  }
  return (
    <button
      type="button"
      className="text-pink-500 p-2 hover:bg-pink-500 hover:bg-opacity-20 rounded-full transition-colors duration-200"
      onClick={() => handleClick()}>
      <BsLightningChargeFill className="w-4 h-4" />
    </button>
  )
}

export default SupaReplyButton
