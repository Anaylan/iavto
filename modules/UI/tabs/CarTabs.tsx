import React from 'react'
import { Col, Row, Tab, Tabs, Nav } from 'react-bootstrap'
import styles from 'assets/sass/components/tabs/tab-nav.module.scss'
import { ITabItems } from 'app/models'

export const CarparkTabs = ({ tabs }: { tabs: ITabItems[] }) => {
  return (
    <>
      {tabs.length ? (
        <Tab.Container
          id='left-tabs-example'
          defaultActiveKey={tabs[0].eventKey}
        >
          <Nav
            variant={'pills'}
            fill
            as={'ul'}
            className={`${styles['tab-nav']} carpark__tab-nav`}
          >
            {tabs.map((item, key) => (
              <TabLink key={key} title={item.title} eventKey={item.eventKey} />
            ))}
          </Nav>
          <Tab.Content>
            {tabs.map((item, key) => (
              <Tab.Pane key={key} eventKey={item.eventKey}>
                {item.contentChild}
              </Tab.Pane>
            ))}
          </Tab.Content>
        </Tab.Container>
      ) : (
        <></>
      )}
    </>
  )
}

export const TabLink = ({
  title,
  eventKey
}: {
  title: string
  eventKey: string
}) => {
  return (
    <Nav.Item bsPrefix={`${styles['tab-nav__item']} nav-item`} as={'li'}>
      <Nav.Link className={`${styles['tab-nav__link']}`} eventKey={eventKey}>
        {title}
      </Nav.Link>
    </Nav.Item>
  )
}
