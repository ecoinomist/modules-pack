import classNames from 'classnames'
import React, { Fragment, PureComponent } from 'react'
import Button from 'react-ui-pack/Button'
import ErrorContent from 'react-ui-pack/ErrorContent'
import Row from 'react-ui-pack/Row'
import Text from 'react-ui-pack/Text'
import View from 'react-ui-pack/View'
import { CLOSE, hasListValue, isInList, logRender } from 'utils-pack'
import { connect } from '../../redux'
import { stateAction } from '../../redux/actions'
import { NAME, POPUP_ALERT, POPUP_CONFIRM, POPUP_ERROR } from '../constants'
import select from '../selectors'

/**
 * MAP STATE & ACTIONS TO PROPS ------------------------------------------------
 * -----------------------------------------------------------------------------
 */
const mapStateToProps = (state) => ({
  activePopups: select.activePopups(state),
  alert: select.alert(state),
  confirm: select.confirm(state),
  error: select.error(state),
  ui: select.ui(state),
})
const mapDispatchToProps = (dispatch) => ({
  actions: {
    close: (activePopup) => dispatch(stateAction(NAME, CLOSE, {activePopup}))
  }
})

/**
 * VIEW TEMPLATE ---------------------------------------------------------------
 * -----------------------------------------------------------------------------
 */
@connect(mapStateToProps, mapDispatchToProps)
@logRender
export default class Popup extends PureComponent {
  render () {
    const {
      activePopups,
      alert,
      error,
      confirm,
      actions,
      ui: {className} = {},
      ...props
    } = this.props
    const activeClass = hasListValue(activePopups) ? ' active' : ''
    const hasAlert = isInList(activePopups, POPUP_ALERT)
    const hasConfirm = isInList(activePopups, POPUP_CONFIRM)
    const hasError = isInList(activePopups, POPUP_ERROR)
    const closeAlert = () => actions.close(POPUP_ALERT)
    const closeConfirm = () => actions.close(POPUP_CONFIRM)
    const closeError = () => actions.close(POPUP_ERROR)

    return (
      <View className={'app__popup' + activeClass}>
        <View className={classNames('app__popup__box zoomin', className)}>
          <View className='app__popup__box__content'>
            {hasAlert &&
            <View>
              {alert.items.map(({id, title, content, closeLabel}, index) => (
                <Fragment key={id || index}>
                  <View>
                    <View className='app__popup__box__header'>
                      <Text className='app__popup__box__header__title'>{title}</Text>
                    </View>
                    <Text className='app__popup__box__body p center'>{content}</Text>
                  </View>
                  <View className='app__popup__box__footer center'>
                    <Button onClick={closeAlert} className='primary'>{closeLabel || 'Ok'}</Button>
                  </View>
                </Fragment>
              ))}
            </View>
            }
            {hasConfirm &&
            <View>
              {confirm.items.map(({id, title, content, cancelLabel, confirmLabel, confirmClass = 'basic primary', action}, index) => (
                <Fragment key={id || index}>
                  <View>
                    <View className='app__popup__box__header'>
                      <Text className='app__popup__box__header__title'>{title || 'Confirm Action'}</Text>
                    </View>
                    <Text className='app__popup__box__body p center'>{content}</Text>
                  </View>
                  <Row className='app__popup__box__footer center'>
                    <Button onClick={closeConfirm}
                            className='basic grey margin-smaller'>{cancelLabel || 'No'}</Button>
                    <Button onClick={() => {
                      closeConfirm()
                      action(id)
                    }} className={'margin-smaller ' + confirmClass}>{confirmLabel || 'Yes'}</Button>
                  </Row>
                </Fragment>
              ))}
            </View>
            }
            {hasError &&
            <View>
              <View className='app__popup__box__header'>
                <Text className='app__popup__box__header__title'>{error.title || `Error!`}</Text>
              </View>
              <View className='app__popup__box__body'>
                <ErrorContent items={error.items} {...props}/>
              </View>
              <View className='app__popup__box__footer center'>
                <Button onClick={closeError} className='primary'>Ok</Button>
              </View>
            </View>
            }
          </View>
        </View>
      </View>
    )
  }
}
