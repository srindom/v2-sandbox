import ColorModuleService from "./service"
import { Module } from "@medusajs/utils"

export const COLOR_MODULE = "colorModuleService"

export default Module(COLOR_MODULE, {
  service: ColorModuleService
})

