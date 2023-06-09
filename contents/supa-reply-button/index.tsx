import cssText from "data-text:~style.css"
import type {
  PlasmoCSConfig,
  PlasmoGetInlineAnchor,
  PlasmoMountShadowHost
} from "plasmo"
import { BsLightningChargeFill } from "react-icons/bs"

export const config: PlasmoCSConfig = {
  matches: ["https://twitter.com/*"]
}

export const getInlineAnchor: PlasmoGetInlineAnchor = () =>
  document.querySelector('[data-testid="toolBar"] > div')

// Use this to optimize unmount lookups
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
  const handleClick = () => {
    const tweetTextElements = document.querySelector(
      '[data-testid="tweetText"]'
    )
    let tweetText = tweetTextElements.innerText
    alert(tweetText)
    if (tweetText !== "") {
      const replyTextElement = document.querySelector('[data-text="true"]')
      if (replyTextElement) {
        const spanElement = document.createElement("span")
        spanElement.textContent = "replying 3"

        // Replace replyTextElement with spanElement
        if (replyTextElement.parentNode) {
          replyTextElement.parentNode.replaceChild(
            spanElement,
            replyTextElement
          )
          const parentElement = document.querySelector(
            '[data-testid="tweetTextarea_0RichTextInputContainer"] > div'
          )
          console.log("parentElement: ", parentElement)
          if (parentElement) {
            parentElement.removeChild(parentElement.firstChild)
          }
        }

        console.log("spanElement: ", spanElement)
        console.log("replyTextElement: ", spanElement) // Updated reference to spanElement
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
