import Fonts from './Fonts'
import Metrics from './Metrics'
import Colors from './Colors'

const GlobalStyle = {
  screen: {
    flex: 1,
    backgroundColor: Colors.background.android
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background.android
  },
  full: {
    flex: 1
  },
  header: {
    backgroundColor: '#fff',
    borderBottomWidth: Metrics.borderWidth,
    borderBottomColor: '#dedede'
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  boxTitle: {
    fontSize: Fonts.size.title,
    color: Colors.font.light
  },
  boxContent: {
    color: Colors.font.light,
    fontSize: 22,
    marginTop: Metrics.doubleBaseMargin
  },
  boxHeader: {
    height: 120,
    backgroundColor: Colors.primary
  },
  buttonLight: {
    backgroundColor: Colors.background.light,
    borderColor: Colors.primary,
    borderWidth: Metrics.borderWidth
  },
  shadowBox: {
    borderColor: '#ddd',
    borderWidth: Metrics.borderWidth,
    overflow: 'hidden'
  },
  flexBox: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardBox: {
    marginHorizontal: Metrics.doubleBaseMargin,
    backgroundColor: Colors.background.light,
    borderRadius: Metrics.borderRadius,
    borderWidth: Metrics.borderWidth,
    borderColor: Colors.border.light,
    overflow: 'hidden'
  },
  borderBottom: {
    borderBottomWidth: Metrics.borderWidth,
    borderBottomColor: Colors.border.normal
  },
  borderHorizontal: {
    borderBottomWidth: Metrics.borderWidth,
    borderBottomColor: Colors.border.normal,
    borderTopWidth: Metrics.borderWidth,
    borderTopColor: Colors.border.normal
  }
}

export default GlobalStyle
