if (UAParser().cpu.architecture) {
  $('#dllink-' + UAParser().cpu.architecture).toggleClass('dl-reco')
}

class Page extends ZeroFrame {
  setSiteInfo (site_info) {

  }

  onOpenWebsocket () {
    this.cmd('serverInfo', [], (info) => {
      this.cmd('fileGet', ['metadata.json'], data => {
        const meta = JSON.parse(data)
        meta.full = 'v' + meta.ver + ' (rev ' + meta.rev + ')'
        $('.curversion').text(meta.full)
        $('.date').text(moment(meta.date).format('MMM DD YYYY @ HH:mm'))
        // $('.date').text(moment(meta.date).format('Do MMMM YYYY HH:mm'))
        // $('.date').text(moment(meta.date).format('LLLL')) // Wednesday, January 3, 2018 4:25 PM
        if (!info.version.match(/^[0-9]\.[0-9]\.[0-9]\.[0-9]$/)) {
          $('#isuptodate').text('Not using ZeroNet Android!')
        } else if (meta.rev === info.rev) {
          $('#isuptodate').addClass('ch-ok').text('Up-to-date!')
        } else if (meta.ver.split('.').slice(0, 3).join('.') === info.version.split('.').slice(0, 3).join('.')) {
          $('#isuptodate').addClass('ch-warn').text('Bugfix update available!')
        } else {
          $('#isuptodate').addClass('ch-nok').text('Outdated! Please upgrade!')
        }
      })
    })
  }

  onRequest (cmd, message) {
    if (cmd == 'setSiteInfo') {
      this.setSiteInfo(message.params)
    } else {
      this.log('Unknown incoming message:', cmd)
    }
  }
}
page = new Page()
