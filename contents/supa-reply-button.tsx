import cssText from "data-text:@/style.css"
import type {
  PlasmoCSConfig,
  PlasmoGetInlineAnchor,
  PlasmoMountShadowHost
} from "plasmo"
import { useState } from "react"
import { BsLightningFill } from "react-icons/bs"

import { sendToBackground } from "@plasmohq/messaging"

export const config: PlasmoCSConfig = {
  matches: ["https://twitter.com/*"]
}

export const getInlineAnchor: PlasmoGetInlineAnchor = async () =>
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
  const [isLoading, setIsLoading] = useState(false)
  const handleClick = async () => {
    const isContentEmpty =
      document.querySelector('[data-text="true"]').innerHTML === ""
    if (isContentEmpty) {
      alert("You need to type something before you can use supareply!")
      return
    }

    setIsLoading(true)

    const tweetTextElements = document.querySelector(
      '[data-testid="tweetText"]'
    )
    let tweetText = "Hello world!"
    if (tweetTextElements) {
      const replyTextElement = document.querySelector('span[data-text="true"]')

      // @ts-ignore

      await sendToBackground({
        name: "complete",
        body: {
          // @ts-ignore
          tweet: tweetTextElements.innerText,
          // @ts-ignore
          reply: replyTextElement.innerText
        }
      }).then((resp) => {
        tweetText = resp.message
      })

      const spanElement = document.createElement("span")
      spanElement.textContent = tweetText
      spanElement.setAttribute("data-text", "true")
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
    setIsLoading(false)
  }
  const shouldRenderButton =
    document.querySelector('h2[aria-level="2"] > span')?.textContent === "Tweet"

  // if (!shouldRenderButton) {
  //   return null
  // }
  return (
    <button
      type="button"
      className="text-pink-500 p-2 hover:bg-pink-500 hover:bg-opacity-20 rounded-full transition-colors duration-200"
      onClick={() => handleClick()}
      disabled={isLoading}>
      {isLoading ? (
        <span className="animate-spin">
          <svg
            aria-hidden="true"
            className="w-4 h-4 text-pink-500 text-opacity-20 animate-spin  fill-pink-500"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </span>
      ) : (
        <BsLightningFill className="w-4 h-4" />
      )}
    </button>
  )
}

export default SupaReplyButton
