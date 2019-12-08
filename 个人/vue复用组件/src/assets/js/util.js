import XLSX from 'xlsx'

const DOCUMENT_NODE_TYPE = 9

export const isObject = (obj) => {
  const type = typeof obj
  return (obj !== null && (type === 'object' || type === 'function'))
}

/**
 * @param { Array } data 需要导出的数据，如[[],[],[]]
 */
export const downloadExcel = (data, sheetName, excelName) => {
  if (!Array.isArray(data)) {
    throw new Error('data is must be Array')
  }
  const ws = XLSX.utils.aoa_to_sheet(data)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, sheetName)
  XLSX.writeFile(wb, excelName)
}

if (typeof Element !== 'undefined' && !Element.prototype.matches) {
  const proto = Element.prototype
  proto.matches = proto.matchesSelector || proto.webkitMatchesSelector || proto.msMatchesSelector || proto.mozMatchesSelector
}
export function closest(el, selector) {
  let newEl = el
  while (newEl && newEl.nodeType !== DOCUMENT_NODE_TYPE) {
    if (typeof newEl.matches === 'function' && newEl.matches(selector)) {
      return newEl
    }
    newEl = newEl.parentNode
  }
  return false
}
