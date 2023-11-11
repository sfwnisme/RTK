import React from 'react'


const withGuard = (Component) => {
  const Wrapper = (props) => {
    const isLoggedIn = true
    // const { isLoggedIn } = useSelector((state) => state.auth)
    return isLoggedIn ? <Component {...props} /> : <mark>change the value from withGouard component</mark>
  }

  return Wrapper
}

export default withGuard
