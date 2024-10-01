import { Text, Column, Container, Heading, Html, Img, Row, Section } from "@react-email/components"
import * as React from "react"

export default function Email({ order }) {
  const formatter = new Intl.NumberFormat([], {
    style: "currency",
    currencyDisplay: "narrowSymbol",
    currency: order.currency_code,
  })

  return (
    <Html>
      <Heading>Thank you for your order</Heading>
      {order.email}'s Items
      <Container>
        {order.items.map(item => {
          return (
            <Section
              key={item.id}
              style={{ paddingTop: "40px", paddingBottom: "40px" }}
            >
              <Row>
                <Column>
                  <Img
                    src={item.thumbnail}
                    alt={item.product_title}
                    style={{ float: "left" }}
                    width="260px"
                  />
                </Column>
                <Column style={{ verticalAlign: "top", paddingLeft: "12px" }}>
                  <Text style={{ fontWeight: "500" }}>
                    {item.product_title}
                  </Text>
                  <Text>{item.variant_title}</Text>
                  <Text>{formatter.format(item.total)}</Text>
                </Column>
              </Row>
            </Section>
          )
        })}
      </Container>
    </Html>
  )
}
