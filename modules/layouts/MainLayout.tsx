import { Footer } from 'modules/templates'
// import Header from 'modules/templates/Header'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

type Props = {
  children?: React.ReactNode
}

const DynamicHeader = dynamic(() => import('../templates/Header'), {
  ssr: false
})

const DynamicContent = dynamic(() => import('../templates/Content'), {
  suspense: true
})

const MasterLayout: React.FC<Props> = ({ children }) => {
  const [showHeader, setShowHeader] = useState(true)
  const [showFooter, setShowFooter] = useState(true)
  const router = useRouter()

  useEffect(() => {
    setShowHeader(
      !router.pathname.includes('/auth/') &&
        !router.pathname.includes('/invite')
    )
    setShowFooter(
      !router.pathname.includes('/auth/') &&
        !router.pathname.includes('/invite') &&
        !router.pathname.includes('/chat')
    )
  }, [router])
  return (
    <>
      {showHeader ? (
        <>
          <DynamicHeader />
          <span id={'mt'} />
        </>
      ) : null}
      <DynamicContent>{children}</DynamicContent>
      {showFooter ? <Footer /> : null}
    </>
  )
}

export { MasterLayout }
