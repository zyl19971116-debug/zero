import { test, expect } from '@playwright/test';

const wallet = '0x1234567812345678123456781234567812345678';

test('disconnected expedition button asks for a wallet', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/#home');
  await page.getByRole('link', { name: /START EXPLORING/ }).click();
  await expect(page.locator('#explore')).toHaveClass(/active/);
  await page.getByRole('button', { name: /THE FORGOTTEN TEMPLE/ }).click();
  await expect(page.locator('#expeditionTitle')).toHaveText('THE FORGOTTEN TEMPLE');
  await expect(page.locator('#expeditionBtn')).toBeEnabled();
  await page.locator('#expeditionBtn').click();
  await expect(page.locator('#toast')).toContainText('Connect your wallet to explore');
  await expect(page.locator('#walletChooser')).toHaveClass(/show/);
  await expect(page.locator('.wallet-options button')).toHaveCount(6);
  expect(errors).toEqual([]);
});

test('token UI is removed and the legacy route redirects home', async ({ page }) => {
  await page.goto('/#token');
  await expect(page).toHaveURL(/#home$/);
  await expect(page.locator('.links a')).toHaveCount(6);
  await expect(page.locator('.links')).not.toContainText('TOKEN');
  await expect(page.locator('#token')).toHaveCount(0);
});

test('wallet chooser connects a selected installed wallet', async ({ page }) => {
  await page.addInitScript(address => {
    const provider = {
      isMetaMask: true,
      request: async ({ method }) => method === 'eth_accounts' ? [] : method === 'eth_requestAccounts' ? [address] : method === 'eth_chainId' ? '0x1' : null,
      on: () => {}
    };
    window.ethereum = { ...provider, providers: [provider] };
  }, wallet);
  await page.goto('/#home');
  await page.locator('#walletBtn').click();
  await expect(page.locator('#walletChooser')).toHaveClass(/show/);
  await page.locator('[data-wallet="metamask"]').click();
  await expect(page.locator('#walletLabel')).toContainText('0x1234');
  await expect(page.locator('#walletChooser')).not.toHaveClass(/show/);
});

test('connected wallet completes and persists a local expedition', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.addInitScript(address => {
    window.ethereum = {
      request: async ({ method }) => ['eth_accounts', 'eth_requestAccounts'].includes(method) ? [address] : method === 'eth_chainId' ? '0x1' : null,
      on: () => {}
    };
  }, wallet);
  await page.goto('/#explore');
  await expect(page.locator('#walletLabel')).toContainText('0x1234');
  await page.getByRole('button', { name: /THE FORGOTTEN TEMPLE/ }).click();
  await page.locator('#expeditionBtn').click();
  await expect(page.locator('#expeditionOverlay')).toHaveClass(/show/);
  await page.locator('#skipExpedition').click();
  await expect(page.locator('#discoveryModal')).toHaveClass(/show/);
  await expect(page.locator('#discoveryName')).not.toHaveText('DISCOVERY');
  await page.locator('#openCollection').click();
  await expect(page.locator('.relic-card')).toHaveCount(1);
  await page.reload();
  await expect(page.locator('.relic-card')).toHaveCount(1);
  const stored = await page.evaluate(address => JSON.parse(localStorage.getItem(`relic-zero:local:v1:${address}`) || '[]'), wallet);
  expect(stored).toHaveLength(1);
  const backendRequests = await page.evaluate(() => performance.getEntriesByType('resource').map(entry => entry.name).filter(url => /\/api\/|railway|redis/i.test(url)));
  expect(backendRequests).toEqual([]);
  expect(errors).toEqual([]);
});
