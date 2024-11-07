import { ConfigProvider, ThemeConfig } from "antd"
import { StrictMode } from "react"
import { RouterProvider } from "react-router-dom"
import { router } from "../routers/AppRouter"
import { ApolloProvider } from "@apollo/client"
import client from "../apollo"

export const AppProvider: React.FC = () => {
  const theme: ThemeConfig = {
    token: {
      colorTextBase: "#292222",
    }
  }
  return (
    <StrictMode>
      <ApolloProvider client={client}>
        <ConfigProvider theme={theme}>
          <RouterProvider router={router} />
        </ConfigProvider>
      </ApolloProvider>
    </StrictMode>
  )
}