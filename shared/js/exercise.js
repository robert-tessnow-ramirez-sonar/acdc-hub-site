/*
 * Exercise page behaviour: autosave answers to localStorage, progress bar,
 * print button, and export/import of answers as a JSON backup.
 *
 * Usage: <script src="../../shared/js/exercise.js" data-storage-prefix="vortex-exercise-"></script>
 * Student pages pass data-storage-prefix. Teacher pages omit it (print only).
 * The prefix matches the original per-page localStorage keys, so existing
 * saved answers keep working.
 */
(function () {
  var script = document.currentScript;
  var prefix = script && script.dataset.storagePrefix;
  var printBtn = document.getElementById('print-btn');
  if (printBtn) printBtn.addEventListener('click', function () { window.print(); });
  if (!prefix) return;

  var textareas = Array.from(document.querySelectorAll('textarea[data-item]'));
  var fill = document.getElementById('progress-fill');
  var label = document.getElementById('progress-label');
  var total = textareas.length;

  function key(id) { return prefix + id; }
  function read(id) { try { return localStorage.getItem(key(id)); } catch (e) { return null; } }
  function write(id, v) { try { localStorage.setItem(key(id), v); } catch (e) {} }

  function updateProgress() {
    var answered = textareas.filter(function (t) { return t.value.trim().length > 0; }).length;
    if (fill) fill.style.width = (total ? Math.round(answered / total * 100) : 0) + '%';
    if (label) label.textContent = answered + ' / ' + total + ' answered';
  }

  textareas.forEach(function (t) {
    var saved = read(t.dataset.item);
    if (saved) t.value = saved;
    var statusEl = t.closest('.item').querySelector('.saved');
    var timer;
    t.addEventListener('input', function () {
      write(t.dataset.item, t.value);
      updateProgress();
      if (statusEl) {
        statusEl.classList.add('show');
        clearTimeout(timer);
        timer = setTimeout(function () { statusEl.classList.remove('show'); }, 1200);
      }
    });
  });
  updateProgress();

  /* Backup: export / import answers as JSON. */
  if (!printBtn) return;
  function makeBtn(text, title) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'btn';
    b.textContent = text;
    b.title = title;
    return b;
  }
  var exportBtn = makeBtn('Export answers', 'Download your answers as a JSON backup file');
  var importBtn = makeBtn('Import answers', 'Restore answers from a backup file');
  var fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'application/json,.json';
  fileInput.hidden = true;
  printBtn.parentNode.insertBefore(exportBtn, printBtn);
  printBtn.parentNode.insertBefore(importBtn, printBtn);
  printBtn.parentNode.appendChild(fileInput);

  exportBtn.addEventListener('click', function () {
    var answers = {};
    textareas.forEach(function (t) { answers[t.dataset.item] = t.value; });
    var blob = new Blob([JSON.stringify({ exercise: prefix, answers: answers }, null, 2)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = prefix + 'answers.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  });

  importBtn.addEventListener('click', function () { fileInput.click(); });
  fileInput.addEventListener('change', function () {
    var file = fileInput.files[0];
    fileInput.value = '';
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function () {
      var data;
      try { data = JSON.parse(reader.result); } catch (e) { data = null; }
      if (!data || data.exercise !== prefix || typeof data.answers !== 'object' || !data.answers) {
        alert('That file is not a backup for this exercise.');
        return;
      }
      var hasExisting = textareas.some(function (t) { return t.value.trim(); });
      if (hasExisting && !confirm('Importing will overwrite the answers currently on this page. Continue?')) return;
      textareas.forEach(function (t) {
        var v = data.answers[t.dataset.item];
        if (typeof v === 'string') { t.value = v; write(t.dataset.item, v); }
      });
      updateProgress();
    };
    reader.readAsText(file);
  });
})();
