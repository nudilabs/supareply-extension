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
  return (
    <button
      type="button"
      className="text-pink-500 p-2 hover:bg-pink-500 hover:bg-opacity-20 rounded-full transition-colors duration-200"
      onClick={() => alert("Hello!")}>
      <BsLightningChargeFill className="w-4 h-4" />
    </button>
  )
}

export default SupaReplyButton
