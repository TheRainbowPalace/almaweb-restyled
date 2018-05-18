// The style variable gets injected at build time
style = `!StylePlaceholder`

/* Inject a hamburger button (which toggles the
*  sidebar) into the website:
*/
document.head.innerHTML += '<style>' + style + '</style>'

sidebar = document.getElementById('pageHead')

menuButton = document.createElement('button')
menuButton.innerText = ""
menuButton.id = 'showSidebar'
menuButton.addEventListener('click', () => sidebar.classList.toggle('open'))

document.body.addEventListener('click', (e) =>
{
  if (e.target !== menuButton && !sidebar.contains(e.target))
  {
    sidebar.classList.remove('open')
  }
})

topBar = document.getElementById('acc_pageDescription')
topBar.appendChild(menuButton)
