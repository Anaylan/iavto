import { Footer } from 'modules/templates'
import Header from 'modules/templates/Header'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

type Props = {
  children?: React.ReactNode
}

const DynamicContent = dynamic(() => import('../templates/Content'), {
  suspense: true
})

const MasterLayout: React.FC<Props> = ({ children }) => {
  const [showHeader, setShowHeader] = useState(true)
  const router = useRouter()

  useEffect(() => {
    setShowHeader(!router.pathname.includes('/auth/'))
  }, [router])
  return (
    <>
      {showHeader ? (
        <>
          <Header />
          <span id={'mt'} />
        </>
      ) : (
        <></>
      )}
      <DynamicContent>{children}</DynamicContent>
      <Footer />
    </>
  )
}

export { MasterLayout }
