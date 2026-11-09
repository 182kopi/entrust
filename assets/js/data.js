// DATA.JS - TITIPKU - VERSI ANTI RESET
function loadList(key, def){
  try{
    var raw = localStorage.getItem(key);
    if(!raw) return def;
    var parsed = JSON.parse(raw);
    if(!Array.isArray(parsed)) return def;
    return parsed;
  }catch(e){ return def; }
}
function loadObj(key, def){
  try{
    var raw = localStorage.getItem(key);
    if(!raw) return def;
    var parsed = JSON.parse(raw);
    if(!parsed || typeof parsed!=='object') return def;
    return parsed;
  }catch(e){ return def; }
}

var defaultToko = [
  {id:1, nama:'Reza', pemilik:'Reza', wa:'', kota:'Jln marsan', komisi:16, status:'Aktif'},
  {id:2, nama:'Fitri 25', pemilik:'Khalisa', wa:'', kota:'Jln cipta karya', komisi:15, status:'Aktif'},
  {id:3, nama:'Tengku hazkal', pemilik:'Hazkal', wa:'', kota:'Jln cipta karya', komisi:15, status:'Aktif'}
];
var defaultProduk = [
  {id:1, nama:'Risol Mayo', barcode:'', kategori:'Makanan', modal:3500, jual:7000, stokGudang:50},
  {id:2, nama:'Aren Latte', barcode:'', kategori:'Minuman', modal:8000, jual:12000, stokGudang:30}
];

// PENTING: Baca dulu dari localStorage, kalau ada JANGAN timpa dengan default
var tokoList = loadList('titipku_toko', defaultToko);
var produkList = loadList('titipku_produk', defaultProduk);
var stokToko = loadList('titipku_stokToko', []);
var titipList = loadList('titipku_titip', []);
var jualList = loadList('titipku_jual', []);
var returList = loadList('titipku_retur', []);
var setoranList = loadList('titipku_setoran', []);
var opnameList = loadList('titipku_opname', []);
var keranjang = [];
var backupHistory = loadList('titipku_backup', []);
var setting = loadObj('titipku_setting', {nama:'182KOPI', alamat:'Pekanbaru', wa:'082366214931', rek:'', minStok:5, komisiDefault:15});

function saveAll(){
  localStorage.setItem('titipku_toko', JSON.stringify(tokoList));
  localStorage.setItem('titipku_produk', JSON.stringify(produkList));
  localStorage.setItem('titipku_stokToko', JSON.stringify(stokToko));
  localStorage.setItem('titipku_titip', JSON.stringify(titipList));
  localStorage.setItem('titipku_jual', JSON.stringify(jualList));
  localStorage.setItem('titipku_retur', JSON.stringify(returList));
  localStorage.setItem('titipku_setoran', JSON.stringify(setoranList));
  localStorage.setItem('titipku_opname', JSON.stringify(opnameList));
  localStorage.setItem('titipku_backup', JSON.stringify(backupHistory));
  localStorage.setItem('titipku_setting', JSON.stringify(setting));
}
function getToko(id){ for(var i=0;i<tokoList.length;i++){ if(tokoList[i].id===id) return tokoList[i]; } return null; }
function getProduk(id){ for(var i=0;i<produkList.length;i++){ if(produkList[i].id===id) return produkList[i]; } return null; }
function getStokToko(tokoId, produkId){ for(var i=0;i<stokToko.length;i++){ if(stokToko[i].tokoId===tokoId && stokToko[i].produkId===produkId) return stokToko[i]; } return null; }
function fmt(n){ return 'Rp ' + (parseInt(n)||0).toLocaleString('id-ID'); }
function todayStr(){ var d=new Date(); return d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2)+'-'+('0'+d.getDate()).slice(-2); }
