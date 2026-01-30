const owner = 'Storik4pro';
const LBrowserRepo = 'LBrowser';
const SDARepo = 'Server-Deployment-Assistant';
const CDPIRepo = 'cdpiui';
const LBRVer = document.getElementById('LBR-ver');
var version = '0.0.0';
var downloadUri = `https://github.com/${owner}/${LBrowserRepo}/releases/download/v${version}/LinesBrowser_arm.appxbundle`;

function CheckRepo(element, repo) {
    fetch(`https://data.jsdelivr.com/v1/package/gh/${owner}/${repo}/`)
        .then(res => {
            if (!res.ok) throw new Error('Network response was not ok');
            return res.json();
        })
        .then(info => {
            element.textContent = `Version ${info.versions[0]}`;
        })
        .catch(err => {
            console.error(err);
            element.textContent = 'Versions list is not available';
        });
}

if (LBRVer) CheckRepo(LBRVer, LBrowserRepo);

const SDAVer = document.getElementById('SDA-ver');
if (SDAVer) CheckRepo(SDAVer, SDARepo);

const CDPIVer = document.getElementById('CDPI-ver');
if (CDPIVer) CheckRepo(CDPIVer, CDPIRepo);

var widgets = [
    {
        owner: 'Storik4pro',
        repo: 'LBrowser',
        selectId: 'LBR-ver-select',
        buttonId: 'LBR-download',
        fileSelectId: 'LBR-file-select'
    },
    {
        owner: 'Storik4pro',
        repo: 'Server-Deployment-Assistant',
        selectId: 'SDA-ver-select',
        buttonId: 'SDA-download'
    },
    {
        owner: 'Storik4pro',
        repo: 'cdpiui',
        selectId: 'CDPI-ver-select',
        buttonId: 'CDPI-download',
        fileSelectId: 'CDPI-file-select'
    },
];

function compareSemver(a, b) {
    var pa = a.split('.').map(function (x) { return parseInt(x, 10) || 0; });
    var pb = b.split('.').map(function (x) { return parseInt(x, 10) || 0; });
    var len = Math.max(pa.length, pb.length), i;
    for (i = 0; i < len; i++) {
        if ((pa[i] || 0) > (pb[i] || 0)) { return -1; }
        if ((pa[i] || 0) < (pb[i] || 0)) { return 1; }
    }
    return 0;
}

function loadVersions(owner, repo, callback, error) {
    var xhr = new XMLHttpRequest();
    var url = 'https://data.jsdelivr.com/v1/package/gh/' +
        encodeURIComponent(owner) + '/' +
        encodeURIComponent(repo);
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) return;
        if (xhr.status >= 200 && xhr.status < 300) {
            try {
                callback(JSON.parse(xhr.responseText));
            } catch (e) {
                error(e);
            }
        } else {
            error(new Error('HTTP ' + xhr.status));
        }
    };
    xhr.send();
}

widgets.forEach(function (w) {
    var sel = document.getElementById(w.selectId);
    var btn = document.getElementById(w.buttonId);
    var fileSel = w.fileSelectId ? document.getElementById(w.fileSelectId) : null;

    loadVersions(w.owner, w.repo, function (data) {
        var versions = data.versions || [];
        versions.sort(compareSemver);
        if (sel) {
            sel.innerHTML = '';
            if (versions.length === 0) {
                var o = document.createElement('option');
                o.text = 'Not found';
                o.disabled = true;
                sel.add(o);
                return;
            }
            for (var i = 0; i < versions.length; i++) {
                var v = versions[i];
                var o = document.createElement('option');
                o.value = v;
                o.text = v;
                if (data.version && v === data.version) o.selected = true;
                sel.add(o);
            }
        }
        
    }, function (err) {
        sel.innerHTML = '';
        var o = document.createElement('option');
        o.text = 'Loading error';
        o.disabled = true;
        sel.add(o);
        console.error('Cannot load versions for', w.repo, err);
    });
    if (btn) {
        btn.onclick = function () {
            var version = sel.value;
            if (!version || version === 'NaN') {
                alert('You must select version for ' + w.repo + ' firstly.');
                return false;
            }
            var fileName;
            if (fileSel) {
                fileName = fileSel.value;
                fileName = fileName.replace("$VERSION", version);
            } else {
                fileName = 'SDA.zip';
            }
            var url = 'https://github.com/' +
                encodeURIComponent(w.owner) + '/' +
                encodeURIComponent(w.repo) +
                '/releases/download/' + (w.repo == 'cdpiui' ? '' : 'v') +
                encodeURIComponent(version) + '/' +
                encodeURIComponent(fileName);
            window.location.href = url;
            return false;
        };
    }
});

