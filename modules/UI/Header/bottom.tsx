import { getAllLocations, getLocation } from 'api/Regions'
import { useOutsideAlerter, useSearch } from 'app/hooks'
import { ILink, IRegionDropdown, IRegionItem } from 'app/models'
import { regionActions } from 'app/redux/reducers/regionReducer'
import { Load, Location } from 'assets/icon/icons'
import styles from 'assets/sass/components/header/bottom.module.scss'
import Link from 'next/link'
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useTransition,
  useDeferredValue
} from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

interface IChildRegion {
  region: IRegionItem
  onClick: CallableFunction
}

interface IHeaderBottom {
  links: ILink[]
}

export const HeaderBottomLink: React.FC<ILink> = ({ href, title }) => {
  return (
    <>
      <li className={`${styles['header-bottom__item']}`}>
        <Link href={href}>{title}</Link>
      </li>
    </>
  )
}

export const HeaderBottom: React.FC<IHeaderBottom> = ({ links }) => {
  return (
    <>
      <div
        className={`header__bottom ${styles['header-bottom']} d-none d-lg-block`}
      >
        <Container>
          <Row className='align-items-center justify-content-between'>
            <ul
              className={`${styles['header-bottom__list']} col d-flex align-items-center`}
            >
              {links.map((link, key) => (
                <HeaderBottomLink
                  key={key}
                  href={link.href}
                  title={link.title}
                />
              ))}
            </ul>
            <RegionSearch />
          </Row>
        </Container>
      </div>
    </>
  )
}

export const RegionSearch = () => {
  const dispatch = useDispatch()
  const [UpActive, setUpActive] = useState<boolean>(false)
  const [locations, setLocations] = useState<IRegionItem[]>([])
  const [currentLocation, setCurrentLocation] = useState<string | null>()
  const name: string | undefined = useSelector(
    ({ region }: { region: IRegionState }) => region.name
  )

  const setActive = () => {
    setUpActive(!UpActive)
  }

  useEffect(() => {
    console.log(name)
    if (!name) {
      getLocation().then(({ data }) => {
        dispatch(regionActions.update(data.name, data.id))
      })
    }
    setCurrentLocation(name)
  }, [])

  const onClose = () => {
    if (UpActive) {
      setUpActive(false)
    }
  }

  const addLocations = (locations: IRegionItem[]) => {
    setLocations(locations)
  }

  const dropdownRef = useRef(null)
  useOutsideAlerter(dropdownRef, onClose)

  const onClick = (name: string, id: number) => {
    dispatch(regionActions.update(name, id))
    setCurrentLocation(name)
  }
  return (
    <Col
      ref={dropdownRef}
      xs={12}
      md={2}
      lg={3}
      className={`header-bottom__region ${styles['header-region']} d-flex justify-content-end`}
    >
      <button
        className={styles['header-region__btn']}
        onClick={() => {
          setActive()
        }}
      >
        <span className={styles['icon']}>
          <Location color={styles['icon__item']} />
        </span>
        <span className={styles['header-region__btn-region']}>
          {currentLocation}
        </span>
      </button>
      <RegionList
        active={UpActive}
        onClick={onClick}
        locations={locations}
        setLocations={addLocations}
      />
    </Col>
  )
}

export const RegionList: React.FC<IRegionDropdown> = ({
  active,
  locations,
  setLocations,
  onClick
}) => {
  const [pTop, setPTop] = useState(false)

  const [loading, setLoading] = useState(false)

  const [transitionValue, setTransitionValue] = useState<string>('')

  const [value, setValue] = useState<string>('')
  const defferedValue = useDeferredValue(value)
  const input = useRef()
  useEffect(() => {
    if (active) {
      getRegions()
    }
  }, [loading, active])

  const filteredRegions = useSearch(defferedValue, locations)

  function getRegions() {
    setLoading(true)
    getAllLocations().then((res: any) => {
      setLocations(res.data)
    })
    setLoading(false)
  }

  function placeholderSearch(value: string) {
    value !== '' ? setPTop(true) : setPTop(false)
    setValue(value)
  }

  const searchRegion = (event: any) => {
    event.preventDefault()
    setValue(event.target.value)
  }

  if (!active)
    return (
      <div className={`header-region__popup ${styles['region-popup']}`}></div>
    )

  return (
    <>
      <div className={`header-region__popup ${styles['region-popup']}`}>
        <form
          onSubmit={searchRegion}
          className={styles['region-popup__form']}
          acceptCharset='UTF-8'
          id='region-search'
        >
          <div
            className={
              pTop
                ? `${styles['region-popup__form-wrap']} ${styles['placeholder-top']}`
                : `${styles[`region-popup__form-wrap`]}`
            }
          >
            <input
              onChange={(event) => {
                placeholderSearch(event.target.value)
              }}
              className={styles['region-popup__form-input']}
              type='text'
              name='s'
            />
          </div>
        </form>
        <ul className={styles['region-popup__list']}>
          {!loading || locations ? (
            filteredRegions.map((region: IRegionItem, key) => (
              <RegionItem onClick={onClick} key={key} region={region} />
            ))
          ) : (
            <Load />
          )}
        </ul>
      </div>
    </>
  )
}

export const RegionItem: React.FC<IChildRegion> = ({ region, onClick }) => {
  return (
    <li className={styles['region-popup__item']}>
      <div
        onClick={() => onClick(region.name, region.id)}
        className={styles['region-popup__content']}
      >
        <div className={styles['region-popup__region']}>{region.name}</div>
        <div className={styles['region-popup__parent-region']}>
          {region.region_name}
        </div>
      </div>
    </li>
  )
}
