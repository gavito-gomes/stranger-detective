import React, { useState, useCallback, useEffect, useRef } from 'react'
import { useFocusEffect } from '@react-navigation/native'

export function useInterval(callback, delay) {
  const savedCallback = useRef()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

export function useTimeout(callback, delay) {
  const savedCallback = useRef()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the timeout.
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    let id = setTimeout(tick, delay)
    return () => clearInterval(id)
  }, [])
}

export function usePausableTimeout(callback, delay) {
  const timerId = useRef()
  const startTime = useRef()
  const remaining = useRef()
  const savedCallback = useRef()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    remaining.current = delay
    return () => clearTimeout(timerId.current)
  }, [])

  const pause = () => {
    clearTimeout(timerId.current)
    remaining.current -= Date.now() - startTime.current
    // console.log('Timer paused! Remaining: ' + remaining.current)
  }

  const resume = () => {
    startTime.current = Date.now()
    clearTimeout(timerId)
    timerId.current = setTimeout(savedCallback.current, remaining.current)
    // console.log('Timer resumed! Remaining: ' + remaining.current)
  }

  const clear = () => {
    clearTimeout(timerId.current)
    remaining.current = delay
  }

  const start = () => {
    clear()
    resume()
  }

  return {
    pause,
    resume,
    clear,
    start,
  }
}
