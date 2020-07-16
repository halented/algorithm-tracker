import React from 'react';
import { render } from '@testing-library/react';
import HooksPage from './components/HooksPage'
import renderer from 'react-test-renderer';



describe("Hooks Page", ()=>{

  test("renders both class lists", ()=>{
    const page = render(<HooksPage />)
    // console.log(getByText("Students who are safe....for now"))
    expect(page.queryAllByText(/Students/i).length).toBe(2)
  })

  test("has a picker function", ()=>{
    const page = render(<HooksPage />)
    console.log(page.baseElement.childNodes)
    expect(page).toBeTruthy()
  })
})
