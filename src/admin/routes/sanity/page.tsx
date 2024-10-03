import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Container } from "@medusajs/ui"

const SanityRoute = () => {
  return <Container>This is my custom route</Container>
}

export const config = defineRouteConfig({
  label: "Sanity",
})

export default SanityRoute
