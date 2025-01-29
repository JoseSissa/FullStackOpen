// @ts-check
import { test, expect } from '@playwright/test';
import { loginWith } from './helper'

test.describe('Note App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('front page can be opened', async ({ page }) => {
    const locator = await page.getByText('Notes')
    await expect(locator).toBeVisible()
    await expect(page.getByText('Browser can execute only JavaScript')).toBeVisible()
  })

  test('login fails with wrong password', async ({ page }) => {
    await page.getByRole('button', { name: 'login' }).click()
    await page.getByTestId('username').fill('mluukkai')
    await page.getByTestId('password').fill('wrong')
    await page.getByRole('button', { name: 'Sign in' }).click()

    const errorDiv = await page.locator('.error')
    await expect(errorDiv).toContainText('Error: Invalid Password')
    await expect(errorDiv).toHaveCSS('border-style', 'solid')
    await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
  })

  test('Login form can be opened', async ({ page }) => {
    await page.getByRole('button', { name: 'login' }).click()
    await page.getByTestId('username').fill('mluukkai')
    await page.getByTestId('password').fill('salainen')

    await page.getByRole('button', { name: 'Sign in' }).click()
  
    await expect(page.getByText('Hola')).toBeVisible()
  })
})

test.describe('When user is logged in', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await loginWith(page, 'mluukkai', 'salainen')  
    await expect(page.getByText('Hola')).toBeVisible()
  })

  // test('A new note can be created', async ({ page }) => {
  //   // await page.getByRole('button', { name: 'new note' }).click()
  //   await page.getByRole('textbox').fill('a note created by playwright')
  //   await page.getByRole('button', { name: 'save' }).click()
  //   await expect(page.getByText('a note created by playwright')).toBeVisible()
  // })

  test('importance can be changed', async ({ page }) => {
    await page.getByRole('button', { name: 'make not important' }).click()
    await expect(page.getByText('make important')).toBeVisible()
  })
});