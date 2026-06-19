(function(){
    function escapeHtml(s){ return s? String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;') : ''; }
    function formatDate(ts){ var d=new Date(ts); return d.toLocaleString(); }
    function key(page){ return 'esp32_feedback_' + page; }
    function load(page){ try{ return JSON.parse(localStorage.getItem(key(page)) || '[]'); }catch(e){ return []; } }
    function save(page, arr){ localStorage.setItem(key(page), JSON.stringify(arr)); }
    function render(page){ var table = document.getElementById('feedbackTable'); if(!table) return; var tbody = table.querySelector('tbody'); if(!tbody) return; tbody.innerHTML = ''; var entries = load(page); entries.forEach(function(e){ var tr = document.createElement('tr'); tr.innerHTML = '<td>' + formatDate(e.ts) + '</td>' + '<td>' + escapeHtml(e.name) + '</td>' + '<td>' + escapeHtml(e.rating) + '</td>' + '<td>' + escapeHtml(e.comment) + '</td>'; tbody.appendChild(tr); }); }
    window.initFeedback = function(page){ var form = document.getElementById('feedbackForm'); var table = document.getElementById('feedbackTable'); if(!form || !table) return; form.addEventListener('submit', function(ev){ ev.preventDefault(); var name = form.elements['name'].value.trim(); var email = form.elements['email'].value.trim(); var rating = form.elements['rating'].value; var comment = form.elements['comment'].value.trim(); if(!name || !comment){ alert('Please enter name and comment'); return; } var entries = load(page); entries.unshift({ ts: Date.now(), name: name, email: email, rating: rating, comment: comment }); save(page, entries); render(page); form.reset(); }); render(page); };
})();
