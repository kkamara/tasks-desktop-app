import React from 'react'

import "./HomeComponent.scss"

export default function HomeComponent() {
  const handlePrimaryBtnClick = () => {
    window.api.send("openChildWindow")
  }

  return (
    <>
      <div className='container home-container'>
        <div className="text-center">
          <button
            className='btn btn-primary home-button'
            onClick={handlePrimaryBtnClick}
          >
            Open Child Window
          </button>
        </div>
      </div>
    </>
  )
}
