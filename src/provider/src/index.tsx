'use default'

import { SSRProvider } from 'react-aria'

type LotusProviderProps = {
  children?: React.ReactNode
}

const LotusProvider = ({ children }: LotusProviderProps) => {
  return <SSRProvider>{children}</SSRProvider>
}

export default LotusProvider
export type { LotusProviderProps }
