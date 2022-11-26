import { ITabItems } from 'app/models';
import { Container, Nav, Tab } from 'react-bootstrap';

export const CarparkTabs = ({ tabs }: { tabs: ITabItems[] }) => {
  return (
    <>
      {tabs.length ? (
        <Tab.Container
          id='left-tabs-example'
          defaultActiveKey={tabs[0].eventKey}>
          <Container>
            <Nav
              variant={'pills'}
              fill
              as={'ul'}
              className={`tab-nav carpark__tab-nav`}>
              {tabs.map((item, key) => (
                <TabLink
                  key={key}
                  title={item.title}
                  eventKey={item.eventKey}
                />
              ))}
            </Nav>
          </Container>
          <Tab.Content className={`carpark__tabs row`}>
            {tabs.map((item, key) => (
              <Tab.Pane key={key} eventKey={item.eventKey}>
                <div className={`carpark-tab__body cars`}>
                  {item.contentChild}
                </div>
              </Tab.Pane>
            ))}
          </Tab.Content>
        </Tab.Container>
      ) : null}
    </>
  );
};

export const TabLink = ({
  title,
  eventKey,
}: {
  title: string;
  eventKey: string;
}) => {
  return (
    <Nav.Item bsPrefix={`tab-nav__item nav-item`} as={'li'}>
      <Nav.Link className={`tab-nav__link`} eventKey={eventKey}>
        {title}
      </Nav.Link>
    </Nav.Item>
  );
};
