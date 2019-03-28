exports.default = class Utils {
  chk(arr, ref) {
    for (let i in arr)
      if (arr[i] == ref)
        return true
    return false
  }
}
