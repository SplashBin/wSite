window.onload = () => {
  let forms = document.getElementsByTagName('form')
  let flips = document.getElementsByClassName('flip')
  flips[0].onclick = (event) => {
    event.preventDefault()
    let tmp = flips[1].parentElement.parentElement
    tmp.style.transform = "translateY(0%)"
  }
  flips[1].onclick = (event) => {
    event.preventDefault()
    let tmp = event.target.parentElement.parentElement
    tmp.style.transform = "translateY(-100%)"
  }
}
