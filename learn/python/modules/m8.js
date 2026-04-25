// AXYON M8 — İleri Python (auto-generated)
window.AXYON_M8 = {
  "id": "m8",
  "label": "İleri Python",
  "icon": "🚀",
  "color": "#7c3aed",
  "lessons": [
  {
    "id": "async_await",
    "icon": "⚡",
    "locked": true,
    "title": "Async/Await Temelleri",
    "desc": "asyncio, coroutine, event loop, gather, create_task — I/O'yu beklemeden çalış.",
    "phases": {
      "lesson": "<div class=\"lesson-text\">\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--purple)\"></div><h3>Async/Await — Bekleme Olmadan Çalış</h3></div>\n    <p>Bir restoranı düşün: garson siparişi alır, mutfağa iletir, <em>yemek hazırlanırken</em> başka masaya gider. Yemeği beklemek için durmuyor. İşte async programlama bu: I/O beklerken (ağ, dosya, veritabanı) diğer işleri yap, zaman kaybetme.</p>\n    <div class=\"box why\"><span class=\"box-icon\">🤔</span><span><strong>Neden async?</strong> Web sitesine istek atıyorsun — cevap 2 saniye sürüyor. Normal kodda 2 saniye boyunca programın donuyor. 100 istek = 200 saniye bekle. Async'te 100 isteği aynı anda başlatırsın, hepsi birlikte gelir — toplam 2 saniye. Özellikle web scraping, API çağrıları, sunucu programlama için devrimsel.</span></div>\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--blue)\"></div><h3>Temel Kavramlar — coroutine, event loop</h3></div>\n    <p><code>async def</code> ile tanımlanan fonksiyon bir <strong>coroutine</strong> döndürür — hemen çalışmaz, çalıştırılması gerekir. <code>await</code> ile beklenebilir nesne beklenir ve bu sürede event loop başka coroutine'lere geçer.</p>\n    <div class=\"code-block runnable\"><div class=\"cb-header\"><div class=\"cb-dots\"></div><span class=\"cb-label\">async_temel.py</span><span class=\"cb-run-tag\">▶</span></div><div class=\"cb-body\"><span class=\"kw\">import</span> asyncio<br><br><span class=\"kw\">async</span> <span class=\"kw\">def</span> <span class=\"fn\">selamlama</span>(isim, gecikme):<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"fn\">print</span>(<span class=\"st\">f\"{isim} başlıyor...\"</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">await</span> asyncio.<span class=\"fn\">sleep</span>(gecikme)<span class=\"cm\">  # beklerken başkası çalışır</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"fn\">print</span>(<span class=\"st\">f\"{isim} bitti! ({gecikme}s)\"</span>)<br><br><span class=\"kw\">async</span> <span class=\"kw\">def</span> <span class=\"fn\">main</span>():<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">await</span> asyncio.<span class=\"fn\">gather</span>(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"fn\">selamlama</span>(<span class=\"st\">\"Ali\"</span>, <span class=\"nm\">2</span>),<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"fn\">selamlama</span>(<span class=\"st\">\"Berk\"</span>, <span class=\"nm\">1</span>),<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"fn\">selamlama</span>(<span class=\"st\">\"Can\"</span>, <span class=\"nm\">3</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;)<br><br><span class=\"cm\"># Toplam ~3sn, 6sn değil!</span><br>asyncio.<span class=\"fn\">run</span>(<span class=\"fn\">main</span>())</div><textarea class=\"cb-src\" style=\"display:none\">import asyncio\nasync def selamlama(isim, gecikme):\n    print(f\"{isim} basliyor...\")\n    await asyncio.sleep(gecikme)\n    print(f\"{isim} bitti! ({gecikme}s)\")\nasync def main():\n    await asyncio.gather(\n        selamlama(\"Ali\", 2),\n        selamlama(\"Berk\", 1),\n        selamlama(\"Can\", 3)\n    )\nasyncio.run(main())</textarea></div>\n    <div class=\"box deep\"><span class=\"box-icon\">🧠</span><span><strong>Event loop nedir?</strong> Tek thread'de çalışan bir döngü. Coroutine'leri sıraya koyar, biri await'e gelince diğerine geçer. Gerçek parallelism değil — CPU işi aynı anda değil. Ama I/O'da bekleme sıfıra yaklaşır. GIL bu nedenle async'te problem değil — zaten tek thread.</span></div>\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--green)\"></div><h3>asyncio.gather vs asyncio.create_task</h3></div>\n    <div class=\"code-block runnable\"><div class=\"cb-header\"><div class=\"cb-dots\"></div><span class=\"cb-label\">gather_task.py</span><span class=\"cb-run-tag\">▶</span></div><div class=\"cb-body\"><span class=\"kw\">async</span> <span class=\"kw\">def</span> <span class=\"fn\">veri_getir</span>(kaynak):<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">await</span> asyncio.<span class=\"fn\">sleep</span>(<span class=\"nm\">1</span>)<span class=\"cm\">  # simüle edilmiş I/O</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">return</span> <span class=\"st\">f\"{kaynak} verisi\"</span><br><br><span class=\"kw\">async</span> <span class=\"kw\">def</span> <span class=\"fn\">main</span>():<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"cm\"># Yöntem 1: gather — hepsini bekle</span><br>&nbsp;&nbsp;&nbsp;&nbsp;sonuclar = <span class=\"kw\">await</span> asyncio.<span class=\"fn\">gather</span>(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"fn\">veri_getir</span>(<span class=\"st\">\"API\"</span>),<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"fn\">veri_getir</span>(<span class=\"st\">\"DB\"</span>),<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"fn\">veri_getir</span>(<span class=\"st\">\"Cache\"</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;)<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"fn\">print</span>(sonuclar)<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"cm\"># Yöntem 2: create_task — arka planda çalıştır</span><br>&nbsp;&nbsp;&nbsp;&nbsp;gorev = asyncio.<span class=\"fn\">create_task</span>(<span class=\"fn\">veri_getir</span>(<span class=\"st\">\"Uzak\"</span>))<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"fn\">print</span>(<span class=\"st\">\"Görev başlatıldı, devam ediyorum...\"</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;sonuc = <span class=\"kw\">await</span> gorev<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"fn\">print</span>(sonuc)</div><textarea class=\"cb-src\" style=\"display:none\">import asyncio\nasync def veri_getir(kaynak):\n    await asyncio.sleep(1)\n    return f\"{kaynak} verisi\"\nasync def main():\n    sonuclar = await asyncio.gather(\n        veri_getir(\"API\"),\n        veri_getir(\"DB\"),\n        veri_getir(\"Cache\")\n    )\n    print(sonuclar)\n    gorev = asyncio.create_task(veri_getir(\"Uzak\"))\n    print(\"Gorev baslatildi, devam ediyorum...\")\n    sonuc = await gorev\n    print(sonuc)\nasyncio.run(main())</textarea></div>\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--amber)\"></div><h3>async for ve async with</h3></div>\n    <div class=\"code-block runnable\"><div class=\"cb-header\"><div class=\"cb-dots\"></div><span class=\"cb-label\">async_for.py</span><span class=\"cb-run-tag\">▶</span></div><div class=\"cb-body\"><span class=\"kw\">async</span> <span class=\"kw\">def</span> <span class=\"fn\">sayi_uret</span>():<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">for</span> i <span class=\"kw\">in</span> <span class=\"fn\">range</span>(<span class=\"nm\">5</span>):<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">await</span> asyncio.<span class=\"fn\">sleep</span>(<span class=\"nm\">0.1</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">yield</span> i<span class=\"cm\">  # async generator!</span><br><br><span class=\"kw\">async</span> <span class=\"kw\">def</span> <span class=\"fn\">main</span>():<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"cm\"># async for — async generator döngüleme</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">async</span> <span class=\"kw\">for</span> sayi <span class=\"kw\">in</span> <span class=\"fn\">sayi_uret</span>():<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"fn\">print</span>(sayi, end=<span class=\"st\">\" \"</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"fn\">print</span>()<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"cm\"># asyncio.timeout (Python 3.11+)</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">try</span>:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">async</span> <span class=\"kw\">with</span> asyncio.<span class=\"fn\">timeout</span>(<span class=\"nm\">0.5</span>):<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">await</span> asyncio.<span class=\"fn\">sleep</span>(<span class=\"nm\">2</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">except</span> asyncio.<span class=\"fn\">TimeoutError</span>:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"fn\">print</span>(<span class=\"st\">\"Zaman aşımı!\"</span>)</div><textarea class=\"cb-src\" style=\"display:none\">import asyncio\nasync def sayi_uret():\n    for i in range(5):\n        await asyncio.sleep(0.1)\n        yield i\nasync def main():\n    async for sayi in sayi_uret():\n        print(sayi, end=\" \")\n    print()\nasyncio.run(main())</textarea></div>\n    <div class=\"box alt\"><span class=\"box-icon\">⚖️</span><span><strong>Async vs Threading vs Multiprocessing:</strong> Async: tek thread, I/O bound işler, en az overhead. Threading: çoklu thread, GIL yüzünden CPU bound'da faydasız, I/O'da iyi. Multiprocessing: gerçek parallelism, CPU bound için. Kural: web/API → async, CPU yoğun hesaplama → multiprocessing.</span></div>\n    <div class=\"box warn\"><span class=\"box-icon\">⚠️</span><span><strong>CPU-bound işlerde async işe yaramaz!</strong> <code>await hesapla()</code> yapsanız bile, içeride saf Python döngüsü varsa event loop bloke olur. CPU işleri için <code>loop.run_in_executor()</code> ile thread/process pool kullan.</span></div>\n    <div class=\"lesson-nav\"><button class=\"nav-btn go\" onclick=\"switchPhase(1)\">🧠 Teste Geç →</button></div>\n  </div>",
      "quiz": [
        {
          "q": "async/await'in asıl faydası nerede ortaya çıkar?",
          "opts": [
            "CPU hesaplamalarında",
            "I/O bound işlerde — ağ, dosya, veritabanı bekleme süreleri",
            "Her durumda",
            "Sadece web sunucularda"
          ],
          "ans": 1,
          "exp": "Async I/O beklerken başka işlere geçer. CPU hesaplamalarında (döngü, matematiksel işlem) bekleme yoktur, async fayda sağlamaz. Ağ isteği, dosya okuma, DB sorgusu → async idealdir."
        },
        {
          "q": "asyncio.gather() ne yapar?",
          "opts": [
            "Coroutine'leri sırayla çalıştırır",
            "Birden fazla coroutine'i aynı anda başlatır ve hepsi bitince sonuçları döner",
            "Sadece bir coroutine çalıştırır",
            "Thread oluşturur"
          ],
          "ans": 1,
          "exp": "gather() tüm coroutine'leri başlatır — biri await'e gelince diğeri devam eder. Toplam süre en uzun görev kadardır, toplamları değil."
        },
        {
          "q": "async def fonksiyon çağrıldığında ne olur?",
          "opts": [
            "Hemen çalışır",
            "Coroutine nesnesi döner — await veya run() olmadan çalışmaz",
            "Thread başlar",
            "Hata verir"
          ],
          "ans": 1,
          "exp": "async def çağrısı coroutine nesnesi döner, çalışmaz. await veya asyncio.run() ile çalıştırılır. Normal fonksiyon gibi doğrudan çağrılamaz."
        },
        {
          "q": "create_task() ile gather() arasındaki fark nedir?",
          "opts": [
            "Aynı şey",
            "create_task arka planda başlatır, gather hepsini birlikte bekler",
            "create_task daha hızlı",
            "gather daha güvenli"
          ],
          "ans": 1,
          "exp": "create_task() görevi başlatır ve beklemeden devam eder — sonuç sonra await ile alınır. gather() hepsini başlatır ve hepsi bitene kadar bekler."
        },
        {
          "q": "CPU yoğun işlerde async neden faydasız?",
          "opts": [
            "Syntax hatası",
            "Saf Python döngüsü event loop'u bloke eder — await olmadığı için başkası çalışamaz",
            "Async sadece network için",
            "Yavaş çalışır"
          ],
          "ans": 1,
          "exp": "Event loop single-thread. CPU işi yapılırken await gelmezse event loop başka coroutine'e geçemez. CPU bound için run_in_executor() veya multiprocessing kullan."
        }
      ],
      "fills": [
        {
          "code": "<span class=\"kw\">async</span> <span class=\"kw\">def</span> <input class=\"blank\" data-ans=\"main\" placeholder=\"?\" style=\"width:45px\">():<span class=\"cm\">  # async fonksiyon</span>",
          "hint": "Fonksiyon adı"
        },
        {
          "code": "&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">await</span> asyncio.<input class=\"blank\" data-ans=\"sleep\" placeholder=\"?\" style=\"width:50px\">(<span class=\"nm\">2</span>)<span class=\"cm\">  # bekle</span>",
          "hint": "Bekleme fonksiyonu"
        },
        {
          "code": "&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">await</span> asyncio.<input class=\"blank\" data-ans=\"gather\" placeholder=\"?\" style=\"width:55px\">(f1(), f2())<span class=\"cm\">  # beraber</span>",
          "hint": "Birlikte çalıştırma"
        },
        {
          "code": "asyncio.<input class=\"blank\" data-ans=\"run\" placeholder=\"?\" style=\"width:35px\">(<span class=\"fn\">main</span>())<span class=\"cm\">  # başlat</span>",
          "hint": "Event loop başlatma"
        },
        {
          "code": "&nbsp;&nbsp;&nbsp;&nbsp;gorev = asyncio.<input class=\"blank\" data-ans=\"create_task\" placeholder=\"?\" style=\"width:95px\">(<span class=\"fn\">veri_getir</span>())",
          "hint": "Arka plan görevi"
        }
      ],
      "drag": [
        {
          "code": "<span class=\"hl\">___</span> def main():  # async fonksiyon",
          "ans": "async",
          "opts": [
            "async",
            "await",
            "def",
            "coroutine",
            "task"
          ],
          "exp": "async def ile coroutine tanımlanır"
        },
        {
          "code": "    <span class=\"hl\">___</span> asyncio.sleep(1)  # bekle",
          "ans": "await",
          "opts": [
            "await",
            "async",
            "yield",
            "return",
            "pause"
          ],
          "exp": "await bekleme noktası — event loop başkasına geçer"
        },
        {
          "code": "asyncio.<span class=\"hl\">___</span>(main())  # çalıştır",
          "ans": "run",
          "opts": [
            "run",
            "start",
            "execute",
            "begin",
            "call"
          ],
          "exp": "asyncio.run() event loop başlatır ve coroutine'i çalıştırır"
        },
        {
          "code": "await asyncio.<span class=\"hl\">___</span>(f1(), f2())",
          "ans": "gather",
          "opts": [
            "gather",
            "run",
            "wait",
            "collect",
            "join"
          ],
          "exp": "gather() birden fazla coroutine'i aynı anda çalıştırır"
        },
        {
          "code": "gorev = asyncio.<span class=\"hl\">___</span>(calistirilacak())",
          "ans": "create_task",
          "opts": [
            "create_task",
            "gather",
            "run",
            "schedule",
            "spawn"
          ],
          "exp": "create_task() görevi hemen başlatır, sonuç sonra alınır"
        }
      ],
      "code": {
        "task": "3 farklı 'kaynak'tan veri getiren async fonksiyonlar yaz. Her biri asyncio.sleep ile farklı süre beklesin (0.5, 1, 1.5). Hepsini gather() ile aynı anda çalıştır ve sonuçları yazdır. Toplam süre ~1.5s olmalı.",
        "starter": "import asyncio\n\nasync def kaynak_getir(ad, sure):\n    await asyncio.sleep(sure)\n    return f\"{ad}: veri hazir ({sure}s)\"\n\nasync def main():\n    sonuclar = await asyncio.gather(\n        kaynak_getir(\"API\", 0.5),\n        kaynak_getir(\"Veritabani\", 1.0),\n        kaynak_getir(\"Dosya\", 1.5)\n    )\n    for s in sonuclar:\n        print(s)\n    print(\"Tumu tamamlandi!\")\n\nasyncio.run(main())",
        "checkFn": "(code)=>{const c=code;const p=(c.includes('async def')?2:0)+(c.includes('await')?2:0)+(c.includes('asyncio.sleep')?2:0)+(c.includes('gather')?2:0)+((c.match(/print/g)||[]).length>=2?2:0);return{pts:Math.min(p,10),max:10,ok:p>=6,msg:p>=8?'Async ustasi! ⚡':p>=6?'Güzel async!':'async def, await, gather kullan.'};",
        "hint": "async def, await asyncio.sleep(), asyncio.gather() ve asyncio.run() yeterli."
      }
    }
  },
  {
    "id": "threading",
    "icon": "🧵",
    "locked": true,
    "title": "Threading",
    "desc": "Thread, Lock, GIL, ThreadPoolExecutor — paralel görünümlü I/O programlama.",
    "phases": {
      "lesson": "<div class=\"lesson-text\">\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--purple)\"></div><h3>Threading — Paralel Görünümlü Programlama</h3></div>\n    <p>Thread: aynı process içinde bağımsız çalışan yürütme akışı. Aynı belleği paylaşırlar — bu hem güç hem de tehlike. Python'da GIL (Global Interpreter Lock) nedeniyle thread'ler gerçek anlamda paralel CPU işi yapamaz ama I/O beklerken birbirlerini bloke etmezler.</p>\n    <div class=\"box why\"><span class=\"box-icon\">🤔</span><span><strong>Neden threading, async değil?</strong> Async: tüm kodu async/await ile yazmak gerekiyor, mevcut senkron kütüphaneler çalışmıyor. Threading: mevcut sync kodu sarabilirsin, requests, time.sleep vs olduğu gibi çalışır. Ama async daha verimli — overhead az, binlerce concurrent task mümkün.</span></div>\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--blue)\"></div><h3>Thread Oluşturma ve Yönetme</h3></div>\n    <div class=\"code-block runnable\"><div class=\"cb-header\"><div class=\"cb-dots\"></div><span class=\"cb-label\">thread_temel.py</span><span class=\"cb-run-tag\">▶</span></div><div class=\"cb-body\"><span class=\"kw\">import</span> threading, time<br><br><span class=\"kw\">def</span> <span class=\"fn\">indirici</span>(url, sonuclar, index):<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"fn\">print</span>(<span class=\"st\">f\"İndiriliyor: {url}\"</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;time.<span class=\"fn\">sleep</span>(<span class=\"nm\">1</span>)&nbsp;<span class=\"cm\"># I/O simülasyonu</span><br>&nbsp;&nbsp;&nbsp;&nbsp;sonuclar[index] = <span class=\"st\">f\"{url} → 200 OK\"</span><br><br>urls = [<span class=\"st\">\"site1.com\"</span>, <span class=\"st\">\"site2.com\"</span>, <span class=\"st\">\"site3.com\"</span>]<br>sonuclar = [<span class=\"kw\">None</span>] * <span class=\"fn\">len</span>(urls)<br>threadler = []<br><br><span class=\"kw\">for</span> i, url <span class=\"kw\">in</span> <span class=\"fn\">enumerate</span>(urls):<br>&nbsp;&nbsp;&nbsp;&nbsp;t = threading.<span class=\"fn\">Thread</span>(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;target=<span class=\"fn\">indirici</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;args=(url, sonuclar, i)<br>&nbsp;&nbsp;&nbsp;&nbsp;)<br>&nbsp;&nbsp;&nbsp;&nbsp;threadler.<span class=\"fn\">append</span>(t)<br>&nbsp;&nbsp;&nbsp;&nbsp;t.<span class=\"fn\">start</span>()<br><br><span class=\"kw\">for</span> t <span class=\"kw\">in</span> threadler:<br>&nbsp;&nbsp;&nbsp;&nbsp;t.<span class=\"fn\">join</span>()<span class=\"cm\">  # bitmesini bekle</span><br><br><span class=\"fn\">print</span>(sonuclar)</div><textarea class=\"cb-src\" style=\"display:none\">import threading, time\ndef indirici(url, sonuclar, index):\n    print(f\"Indiriliyor: {url}\")\n    time.sleep(1)\n    sonuclar[index] = f\"{url} -> 200 OK\"\nurls = [\"site1.com\", \"site2.com\", \"site3.com\"]\nsonuclar = [None] * len(urls)\nthreadler = []\nfor i, url in enumerate(urls):\n    t = threading.Thread(target=indirici, args=(url, sonuclar, i))\n    threadler.append(t)\n    t.start()\nfor t in threadler:\n    t.join()\nprint(sonuclar)</textarea></div>\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--green)\"></div><h3>Lock — Race Condition'ı Önle</h3></div>\n    <p>Thread'ler paylaşılan veriyi aynı anda değiştirmeye çalışırsa <strong>race condition</strong> oluşur — beklenmedik, tekrar edilmesi zor hatalar. <code>Lock</code> ile kritik bölgeleri koru.</p>\n    <div class=\"code-block runnable\"><div class=\"cb-header\"><div class=\"cb-dots\"></div><span class=\"cb-label\">lock.py</span><span class=\"cb-run-tag\">▶</span></div><div class=\"cb-body\"><span class=\"kw\">import</span> threading<br><br><span class=\"cm\"># YANLIŞ — race condition</span><br>sayac = <span class=\"nm\">0</span><br><span class=\"kw\">def</span> <span class=\"fn\">artir_yanlis</span>():<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">global</span> sayac<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">for</span> _ <span class=\"kw\">in</span> <span class=\"fn\">range</span>(<span class=\"nm\">100000</span>): sayac += <span class=\"nm\">1</span><br><br><span class=\"cm\"># DOĞRU — lock ile güvenli</span><br>lock = threading.<span class=\"fn\">Lock</span>()<br>sayac2 = <span class=\"nm\">0</span><br><span class=\"kw\">def</span> <span class=\"fn\">artir_guvenli</span>():<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">global</span> sayac2<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">with</span> lock:<span class=\"cm\">  # kritik bölge</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">for</span> _ <span class=\"kw\">in</span> <span class=\"fn\">range</span>(<span class=\"nm\">100000</span>): sayac2 += <span class=\"nm\">1</span><br><br>t1 = threading.<span class=\"fn\">Thread</span>(target=<span class=\"fn\">artir_guvenli</span>)<br>t2 = threading.<span class=\"fn\">Thread</span>(target=<span class=\"fn\">artir_guvenli</span>)<br>t1.<span class=\"fn\">start</span>(); t2.<span class=\"fn\">start</span>()<br>t1.<span class=\"fn\">join</span>(); t2.<span class=\"fn\">join</span>()<br><span class=\"fn\">print</span>(sayac2)<span class=\"cm\">  # Her zaman 200000</span></div><textarea class=\"cb-src\" style=\"display:none\">import threading\nlock = threading.Lock()\nsayac = 0\ndef artir():\n    global sayac\n    with lock:\n        for _ in range(100000):\n            sayac += 1\nt1 = threading.Thread(target=artir)\nt2 = threading.Thread(target=artir)\nt1.start(); t2.start()\nt1.join(); t2.join()\nprint(sayac)</textarea></div>\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--amber)\"></div><h3>ThreadPoolExecutor — Havuz Yönetimi</h3></div>\n    <div class=\"code-block runnable\"><div class=\"cb-header\"><div class=\"cb-dots\"></div><span class=\"cb-label\">threadpool.py</span><span class=\"cb-run-tag\">▶</span></div><div class=\"cb-body\"><span class=\"kw\">from</span> concurrent.futures <span class=\"kw\">import</span> ThreadPoolExecutor<br><span class=\"kw\">import</span> time<br><br><span class=\"kw\">def</span> <span class=\"fn\">islem</span>(n):<br>&nbsp;&nbsp;&nbsp;&nbsp;time.<span class=\"fn\">sleep</span>(<span class=\"nm\">0.5</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">return</span> n * n<br><br><span class=\"kw\">with</span> <span class=\"fn\">ThreadPoolExecutor</span>(max_workers=<span class=\"nm\">4</span>) <span class=\"kw\">as</span> executor:<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"cm\"># map — tüm sonuçları bekle</span><br>&nbsp;&nbsp;&nbsp;&nbsp;sonuclar = <span class=\"fn\">list</span>(executor.<span class=\"fn\">map</span>(<span class=\"fn\">islem</span>, <span class=\"fn\">range</span>(<span class=\"nm\">8</span>)))<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"fn\">print</span>(sonuclar)<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"cm\"># submit — tek görev, Future döner</span><br>&nbsp;&nbsp;&nbsp;&nbsp;future = executor.<span class=\"fn\">submit</span>(<span class=\"fn\">islem</span>, <span class=\"nm\">5</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"fn\">print</span>(future.<span class=\"fn\">result</span>())</div><textarea class=\"cb-src\" style=\"display:none\">from concurrent.futures import ThreadPoolExecutor\nimport time\ndef islem(n):\n    time.sleep(0.5)\n    return n * n\nwith ThreadPoolExecutor(max_workers=4) as executor:\n    sonuclar = list(executor.map(islem, range(8)))\n    print(sonuclar)</textarea></div>\n    <div class=\"box deep\"><span class=\"box-icon\">🧠</span><span><strong>GIL (Global Interpreter Lock):</strong> CPython'un çekirdek tasarım kararı. Aynı anda yalnızca bir thread Python bytecode çalıştırabilir. Bu nedenle threading CPU hesaplamalarını hızlandırmaz. Ama I/O beklerken GIL serbest bırakılır — thread'ler I/O'da gerçekten paralel çalışır.</span></div>\n    <div class=\"box alt\"><span class=\"box-icon\">⚖️</span><span><strong>threading vs asyncio:</strong> Mevcut senkron kütüphane (requests, SQLite) varsa threading daha kolay entegrasyon. Tüm kodu async yazabiliyorsan asyncio daha verimli — overhead yok, binlerce task mümkün. Yeni proje: asyncio. Mevcut sync kod: threading.</span></div>\n    <div class=\"box warn\"><span class=\"box-icon\">⚠️</span><span><strong>Deadlock riski:</strong> lock1.acquire() → lock2.acquire() diyen thread ile lock2.acquire() → lock1.acquire() diyen başka thread birbirini sonsuza dek bekler. Her zaman lock'ları aynı sırayla al. <code>with</code> bloğu lock'u otomatik serbest bırakır — acquire/release yazmaktan daha güvenli.</span></div>\n    <div class=\"lesson-nav\"><button class=\"nav-btn go\" onclick=\"switchPhase(1)\">🧠 Teste Geç →</button></div>\n  </div>",
      "quiz": [
        {
          "q": "Python'da GIL neden var ve ne etkisi yapar?",
          "opts": [
            "Güvenlik için",
            "CPython'un tasarım kararı — aynı anda tek thread bytecode çalıştırır, CPU-bound işlerde threading faydasız",
            "Hız için",
            "Thread sayısını sınırlar"
          ],
          "ans": 1,
          "exp": "GIL: Python nesne referans sayımını thread-safe yapmak için tek lock. CPU hesaplamalarında birden fazla thread aynı anda çalışamaz. I/O beklerken GIL serbest bırakılır."
        },
        {
          "q": "Race condition nedir?",
          "opts": [
            "Thread çok hızlı çalışınca",
            "İki thread paylaşılan veriyi aynı anda okuyup yazınca beklenmedik sonuç",
            "Thread donması",
            "Bellek taşması"
          ],
          "ans": 1,
          "exp": "Race condition: thread zamanlamasına bağlı belirsiz sonuç. sayac += 1 aslında 3 adım (oku, artır, yaz) — iki thread aynı değeri okursa biri kaybolur."
        },
        {
          "q": "join() ne işe yarar?",
          "opts": [
            "Thread başlatır",
            "Ana thread, join edilen thread bitene kadar bekler",
            "Thread iptal eder",
            "Thread hızlandırır"
          ],
          "ans": 1,
          "exp": "t.join() ana thread'i bekletir. join() çağrılmazsa ana program thread bitmeden devam edebilir. Tüm thread'leri join etmek sonuçların hazır olmasını garantiler."
        },
        {
          "q": "Lock ile with bloğu kullanmanın avantajı?",
          "opts": [
            "Daha hızlı",
            "Exception olsa bile lock otomatik serbest bırakılır — deadlock riski azalır",
            "Daha kısa kod",
            "Thread'i durdurur"
          ],
          "ans": 1,
          "exp": "with lock: bloğu __enter__/__exit__ kullanır. İstisna olsa bile __exit__ çağrılır ve lock serbest bırakılır. acquire/release manuel yazılırsa exception durumunda lock takılı kalabilir."
        },
        {
          "q": "ThreadPoolExecutor ne avantajı sağlar?",
          "opts": [
            "Daha fazla CPU kullanır",
            "Thread havuzu yönetir — her görev için yeni thread yerine havuzdan alır, kaynak tasarrufu",
            "GIL kaldırır",
            "Async yapar"
          ],
          "ans": 1,
          "exp": "Thread oluşturma maliyetli. Pool: max_workers kadar thread hazır tutar, görevler bittikçe yeni görevler atar. map() ve submit() ile kullanımı kolay, context manager ile otomatik cleanup."
        }
      ],
      "fills": [
        {
          "code": "t = threading.<input class=\"blank\" data-ans=\"Thread\" placeholder=\"?\" style=\"width:55px\">(target=<span class=\"fn\">islem</span>, args=(url,))",
          "hint": "Thread sınıfı"
        },
        {
          "code": "t.<input class=\"blank\" data-ans=\"start\" placeholder=\"?\" style=\"width:45px\">()<span class=\"cm\">  # thread başlat</span>",
          "hint": "Başlatma metodu"
        },
        {
          "code": "t.<input class=\"blank\" data-ans=\"join\" placeholder=\"?\" style=\"width:40px\">()<span class=\"cm\">  # bitmesini bekle</span>",
          "hint": "Bekleme metodu"
        },
        {
          "code": "lock = threading.<input class=\"blank\" data-ans=\"Lock\" placeholder=\"?\" style=\"width:42px\">()<span class=\"cm\">  # kilit oluştur</span>",
          "hint": "Kilit sınıfı"
        },
        {
          "code": "<span class=\"kw\">with</span> <input class=\"blank\" data-ans=\"lock\" placeholder=\"?\" style=\"width:40px\">:<span class=\"cm\">  # kritik bölge</span>",
          "hint": "Kilit değişkeni"
        }
      ],
      "drag": [
        {
          "code": "t = threading.<span class=\"hl\">___</span>(target=f, args=(x,))",
          "ans": "Thread",
          "opts": [
            "Thread",
            "Lock",
            "Event",
            "Timer",
            "Barrier"
          ],
          "exp": "threading.Thread ile yeni thread oluşturulur"
        },
        {
          "code": "t.<span class=\"hl\">___</span>()  # thread başlat",
          "ans": "start",
          "opts": [
            "start",
            "run",
            "begin",
            "execute",
            "launch"
          ],
          "exp": "start() thread'i başlatır — target fonksiyonu yeni thread'de çalıştırır"
        },
        {
          "code": "t.<span class=\"hl\">___</span>()  # bitmesini bekle",
          "ans": "join",
          "opts": [
            "join",
            "wait",
            "sync",
            "finish",
            "block"
          ],
          "exp": "join() ana thread'i bekletir — thread bitene kadar ilerlemez"
        },
        {
          "code": "with <span class=\"hl\">___</span>:  # kritik bölge",
          "ans": "lock",
          "opts": [
            "lock",
            "thread",
            "mutex",
            "sync",
            "barrier"
          ],
          "exp": "with lock: kritik bölgeyi korur — aynı anda tek thread girebilir"
        },
        {
          "code": "with ThreadPoolExecutor(max_workers=<span class=\"hl\">___</span>) as ex:",
          "ans": "4",
          "opts": [
            "4",
            "1",
            "0",
            "100",
            "True"
          ],
          "exp": "max_workers havuzdaki maksimum thread sayısı"
        }
      ],
      "code": {
        "task": "ThreadPoolExecutor kullanarak 1-10 sayılarının karelerini paralel hesapla. Her hesaplama 0.1 saniye sürsün (time.sleep). map() ile sonuçları al ve yazdır.",
        "starter": "from concurrent.futures import ThreadPoolExecutor\nimport time\n\ndef kare_hesapla(n):\n    time.sleep(0.1)\n    return n * n\n\nwith ThreadPoolExecutor(max_workers=5) as executor:\n    sonuclar = list(executor.map(kare_hesapla, range(1, 11)))\n\nprint('Kareler:', sonuclar)\nprint('Toplam:', sum(sonuclar))",
        "checkFn": "(code)=>{const c=code;const p=(c.includes('ThreadPoolExecutor')?3:0)+(c.includes('executor.map')||c.includes('executor.submit')?3:0)+(c.includes('time.sleep')?2:0)+((c.match(/print/g)||[]).length>=1?2:0);return{pts:Math.min(p,10),max:10,ok:p>=6,msg:p>=8?'Thread ustasi! 🧵':p>=6?'Güzel threading!':'ThreadPoolExecutor ve map() kullan.'};",
        "hint": "with ThreadPoolExecutor(max_workers=N) as executor: ile havuz oluştur. executor.map(fonk, liste) ile paralel çalıştır."
      }
    }
  },
  {
    "id": "multiprocessing",
    "icon": "🧵",
    "locked": true,
    "title": "Multiprocessing",
    "desc": "Pool, Process, Queue, ProcessPoolExecutor — GIL'i aş, gerçek parallelism.",
    "phases": {
      "lesson": "<div class=\"lesson-text\">\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--purple)\"></div><h3>Multiprocessing — Gerçek Parallelism</h3></div>\n    <p>Threading GIL nedeniyle CPU'yu tam kullanamıyor. Multiprocessing her process için ayrı Python interpreter başlatır — her birinin kendi GIL'i var. 8 core'lu makinede 8 kat hız mümkün. Ama ayrı bellek alanları var — veri paylaşımı daha zor.</p>\n    <div class=\"box why\"><span class=\"box-icon\">🤔</span><span><strong>Ne zaman multiprocessing?</strong> Büyük veri işleme, matematiksel hesaplama, görüntü işleme, makine öğrenmesi eğitimi — CPU yoğun her iş için. Örnek: 1 milyon sayının karekökünü hesapla. Tek process: 2s. 4 process: ~0.5s. I/O bound için gereksiz overhead — orada async/threading tercih et.</span></div>\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--blue)\"></div><h3>Process Pool — Basit Başlangıç</h3></div>\n    <div class=\"code-block runnable\"><div class=\"cb-header\"><div class=\"cb-dots\"></div><span class=\"cb-label\">pool.py</span><span class=\"cb-run-tag\">▶</span></div><div class=\"cb-body\"><span class=\"kw\">from</span> multiprocessing <span class=\"kw\">import</span> Pool<br><span class=\"kw\">import</span> math, time<br><br><span class=\"kw\">def</span> <span class=\"fn\">agir_hesap</span>(n):<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">return</span> <span class=\"fn\">sum</span>(<span class=\"fn\">math</span>.<span class=\"fn\">sqrt</span>(i) <span class=\"kw\">for</span> i <span class=\"kw\">in</span> <span class=\"fn\">range</span>(n))<br><br>sayilar = [<span class=\"nm\">10**6</span>] * <span class=\"nm\">8</span><br><br><span class=\"cm\"># Tek process</span><br>t1 = time.<span class=\"fn\">time</span>()<br>tek = [<span class=\"fn\">agir_hesap</span>(n) <span class=\"kw\">for</span> n <span class=\"kw\">in</span> sayilar]<br><span class=\"fn\">print</span>(<span class=\"st\">f\"Tek: {time.time()-t1:.2f}s\"</span>)<br><br><span class=\"cm\"># Pool ile paralel</span><br>t2 = time.<span class=\"fn\">time</span>()<br><span class=\"kw\">with</span> <span class=\"fn\">Pool</span>() <span class=\"kw\">as</span> pool:<span class=\"cm\">  # CPU sayısı kadar process</span><br>&nbsp;&nbsp;&nbsp;&nbsp;paralel = pool.<span class=\"fn\">map</span>(<span class=\"fn\">agir_hesap</span>, sayilar)<br><span class=\"fn\">print</span>(<span class=\"st\">f\"Pool: {time.time()-t2:.2f}s\"</span>)</div><textarea class=\"cb-src\" style=\"display:none\">from multiprocessing import Pool\nimport math, time\ndef agir_hesap(n):\n    return sum(math.sqrt(i) for i in range(n))\nif __name__ == \"__main__\":\n    sayilar = [10**5] * 4\n    t1 = time.time()\n    tek = [agir_hesap(n) for n in sayilar]\n    print(f\"Tek: {time.time()-t1:.2f}s\")\n    t2 = time.time()\n    with Pool() as pool:\n        paralel = pool.map(agir_hesap, sayilar)\n    print(f\"Pool: {time.time()-t2:.2f}s\")</textarea></div>\n    <div class=\"box warn\"><span class=\"box-icon\">⚠️</span><span><strong><code>if __name__ == '__main__':</code> ŞART!</strong> Windows ve macOS'ta multiprocessing child process'ler ana modülü import eder. Guard olmadan sonsuz process oluşturur ve sistem kilitlenir. Linux'ta fork ile başlar (sorun yok) ama her platformda guard yazmak iyi alışkanlık.</span></div>\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--green)\"></div><h3>Process Arası İletişim — Queue ve Pipe</h3></div>\n    <div class=\"code-block runnable\"><div class=\"cb-header\"><div class=\"cb-dots\"></div><span class=\"cb-label\">queue.py</span><span class=\"cb-run-tag\">▶</span></div><div class=\"cb-body\"><span class=\"kw\">from</span> multiprocessing <span class=\"kw\">import</span> Process, Queue<br><br><span class=\"kw\">def</span> <span class=\"fn\">uretici</span>(kuyruk):<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">for</span> i <span class=\"kw\">in</span> <span class=\"fn\">range</span>(<span class=\"nm\">5</span>):<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;kuyruk.<span class=\"fn\">put</span>(i * i)<br>&nbsp;&nbsp;&nbsp;&nbsp;kuyruk.<span class=\"fn\">put</span>(<span class=\"kw\">None</span>)<span class=\"cm\">  # bitiş işareti</span><br><br><span class=\"kw\">def</span> <span class=\"fn\">tuketici</span>(kuyruk):<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">while</span> <span class=\"kw\">True</span>:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;deger = kuyruk.<span class=\"fn\">get</span>()<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">if</span> deger <span class=\"kw\">is</span> <span class=\"kw\">None</span>: <span class=\"kw\">break</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"fn\">print</span>(<span class=\"st\">f\"Aldım: {deger}\"</span>)<br><br><span class=\"kw\">if</span> __name__ == <span class=\"st\">\"__main__\"</span>:<br>&nbsp;&nbsp;&nbsp;&nbsp;q = <span class=\"fn\">Queue</span>()<br>&nbsp;&nbsp;&nbsp;&nbsp;p1 = <span class=\"fn\">Process</span>(target=<span class=\"fn\">uretici</span>, args=(q,))<br>&nbsp;&nbsp;&nbsp;&nbsp;p2 = <span class=\"fn\">Process</span>(target=<span class=\"fn\">tuketici</span>, args=(q,))<br>&nbsp;&nbsp;&nbsp;&nbsp;p1.<span class=\"fn\">start</span>(); p2.<span class=\"fn\">start</span>()<br>&nbsp;&nbsp;&nbsp;&nbsp;p1.<span class=\"fn\">join</span>(); p2.<span class=\"fn\">join</span>()</div><textarea class=\"cb-src\" style=\"display:none\">from multiprocessing import Process, Queue\ndef uretici(kuyruk):\n    for i in range(5):\n        kuyruk.put(i * i)\n    kuyruk.put(None)\ndef tuketici(kuyruk):\n    while True:\n        deger = kuyruk.get()\n        if deger is None: break\n        print(f\"Aldim: {deger}\")\nif __name__ == \"__main__\":\n    q = Queue()\n    p1 = Process(target=uretici, args=(q,))\n    p2 = Process(target=tuketici, args=(q,))\n    p1.start(); p2.start()\n    p1.join(); p2.join()</textarea></div>\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--amber)\"></div><h3>ProcessPoolExecutor — Modern Yol</h3></div>\n    <div class=\"code-block runnable\"><div class=\"cb-header\"><div class=\"cb-dots\"></div><span class=\"cb-label\">process_pool_exec.py</span><span class=\"cb-run-tag\">▶</span></div><div class=\"cb-body\"><span class=\"kw\">from</span> concurrent.futures <span class=\"kw\">import</span> ProcessPoolExecutor<br><span class=\"kw\">import</span> math<br><br><span class=\"kw\">def</span> <span class=\"fn\">hesapla</span>(n): <span class=\"kw\">return</span> <span class=\"fn\">sum</span>(<span class=\"fn\">math</span>.<span class=\"fn\">sqrt</span>(i) <span class=\"kw\">for</span> i <span class=\"kw\">in</span> <span class=\"fn\">range</span>(n))<br><br><span class=\"kw\">if</span> __name__ == <span class=\"st\">\"__main__\"</span>:<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">with</span> <span class=\"fn\">ProcessPoolExecutor</span>() <span class=\"kw\">as</span> ex:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;futures = [ex.<span class=\"fn\">submit</span>(<span class=\"fn\">hesapla</span>, <span class=\"nm\">10**5</span>) <span class=\"kw\">for</span> _ <span class=\"kw\">in</span> <span class=\"fn\">range</span>(<span class=\"nm\">4</span>)]<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sonuclar = [f.<span class=\"fn\">result</span>() <span class=\"kw\">for</span> f <span class=\"kw\">in</span> futures]<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"fn\">print</span>(<span class=\"fn\">len</span>(sonuclar), <span class=\"st\">\"sonuç alındı\"</span>)</div><textarea class=\"cb-src\" style=\"display:none\">from concurrent.futures import ProcessPoolExecutor\nimport math\ndef hesapla(n):\n    return sum(math.sqrt(i) for i in range(n))\nif __name__ == \"__main__\":\n    with ProcessPoolExecutor() as ex:\n        futures = [ex.submit(hesapla, 10**4) for _ in range(4)]\n        sonuclar = [f.result() for f in futures]\n        print(len(sonuclar), \"sonuc alindi\")</textarea></div>\n    <div class=\"box alt\"><span class=\"box-icon\">⚖️</span><span><strong>Pool vs ProcessPoolExecutor:</strong> Pool: multiprocessing modülünden, daha düşük seviye, map/starmap/apply. ProcessPoolExecutor: concurrent.futures, ThreadPoolExecutor ile aynı API — geçiş kolay, future nesneleri döner. Yeni kod için ProcessPoolExecutor önerilir.</span></div>\n    <div class=\"box deep\"><span class=\"box-icon\">🧠</span><span><strong>Pickle zorunluluğu:</strong> Process'ler arası veri aktarımı pickle ile serileştirilir. Lambda, iç fonksiyon, generator, bazı sınıflar pickle edilemez — TypeError alırsın. Fonksiyon modül seviyesinde tanımlı olmalı. Bu threading'den büyük fark.</span></div>\n    <div class=\"lesson-nav\"><button class=\"nav-btn go\" onclick=\"switchPhase(1)\">🧠 Teste Geç →</button></div>\n  </div>",
      "quiz": [
        {
          "q": "Multiprocessing threading'den nasıl farklı?",
          "opts": [
            "Sadece isim farklı",
            "Her process ayrı interpreter ve GIL — gerçek CPU parallelism, ayrı bellek",
            "Daha yavaş",
            "Sadece Linux'ta çalışır"
          ],
          "ans": 1,
          "exp": "Multiprocessing: ayrı Python process'ler, her birinin kendi GIL'i. CPU-bound işlerde gerçek parallelism. Threading: paylaşılan bellek ama GIL nedeniyle CPU-bound'da paralel değil."
        },
        {
          "q": "if __name__ == '__main__' neden zorunlu?",
          "opts": [
            "Python kuralı",
            "Child process'ler ana modülü import ettiğinde sonsuz process döngüsünü önler",
            "Performans için",
            "Windows'ta değil"
          ],
          "ans": 1,
          "exp": "Windows/macOS'ta spawn yöntemi child process için ana modülü import eder. Guard olmadan bu import tetiklenince yeni process başlar, o da import eder → sonsuz döngü, sistem çöker."
        },
        {
          "q": "Pool.map() ne yapar?",
          "opts": [
            "Listeyi sıralar",
            "Fonksiyonu liste elemanlarına paralel uygular, sonuçları sıralı döner",
            "Thread oluşturur",
            "Asenkron çalışır"
          ],
          "ans": 1,
          "exp": "pool.map(fonk, liste): her eleman için process'e gönderir, paralel çalışır, sonuçları orijinal sırayla döner. map() tüm bitmesini bekler."
        },
        {
          "q": "Queue process'ler arası iletişimde neden kullanılır?",
          "opts": [
            "Daha hızlı",
            "Process'ler ayrı bellekte — global değişken paylaşılamaz, Queue güvenli köprü",
            "Thread güvenliği",
            "Pickle olmadan"
          ],
          "ans": 1,
          "exp": "Process'ler izole bellek alanlarında çalışır — paylaşılan değişken yok. Queue, Pipe, Manager gibi IPC (Inter-Process Communication) araçları veriyi serialze ederek process'ler arası aktarır."
        },
        {
          "q": "Neden lambda multiprocessing ile çalışmaz?",
          "opts": [
            "Python kısıtlaması",
            "Lambda pickle edilemez — process'e gönderilemez",
            "Syntax hatası",
            "Çalışır aslında"
          ],
          "ans": 1,
          "exp": "Process'ler arası veri aktarımı pickle (serialization) kullanır. Lambda'lar, iç fonksiyonlar pickle edilemez çünkü modül seviyesinde isimleri yok. Modül seviyesinde def ile tanımlı fonksiyonlar çalışır."
        }
      ],
      "fills": [
        {
          "code": "<span class=\"kw\">from</span> multiprocessing <span class=\"kw\">import</span> <input class=\"blank\" data-ans=\"Pool\" placeholder=\"?\" style=\"width:42px\">",
          "hint": "Havuz sınıfı"
        },
        {
          "code": "<span class=\"kw\">with</span> <input class=\"blank\" data-ans=\"Pool\" placeholder=\"?\" style=\"width:42px\">() <span class=\"kw\">as</span> pool:",
          "hint": "Process havuzu"
        },
        {
          "code": "&nbsp;&nbsp;&nbsp;&nbsp;paralel = pool.<input class=\"blank\" data-ans=\"map\" placeholder=\"?\" style=\"width:38px\">(<span class=\"fn\">hesapla</span>, sayilar)",
          "hint": "Paralel uygulama"
        },
        {
          "code": "<span class=\"kw\">if</span> __name__ == <input class=\"blank\" data-ans=\"\"__main__\"\" placeholder=\"?\" style=\"width:90px\">:",
          "hint": "Guard ifadesi"
        },
        {
          "code": "&nbsp;&nbsp;&nbsp;&nbsp;kuyruk.<input class=\"blank\" data-ans=\"put\" placeholder=\"?\" style=\"width:35px\">(deger)<span class=\"cm\">  # veri gönder</span>",
          "hint": "Queue'ya ekleme"
        }
      ],
      "drag": [
        {
          "code": "from multiprocessing import <span class=\"hl\">___</span>",
          "ans": "Pool",
          "opts": [
            "Pool",
            "Thread",
            "Lock",
            "Queue",
            "Process"
          ],
          "exp": "Pool process havuzu — CPU sayısı kadar worker"
        },
        {
          "code": "with Pool() as pool: pool.<span class=\"hl\">___</span>(f, liste)",
          "ans": "map",
          "opts": [
            "map",
            "apply",
            "submit",
            "run",
            "execute"
          ],
          "exp": "map() fonksiyonu tüm elemanlara paralel uygular"
        },
        {
          "code": "if __name__ == <span class=\"hl\">___</span>:",
          "ans": "\"__main__\"",
          "opts": [
            "\"__main__\"",
            "\"main\"",
            "\"__init__\"",
            "\"start\"",
            "\"run\""
          ],
          "exp": "Multiprocessing için zorunlu guard"
        },
        {
          "code": "q = <span class=\"hl\">___</span>()  # IPC kuyruğu",
          "ans": "Queue",
          "opts": [
            "Queue",
            "List",
            "Pipe",
            "Dict",
            "Stack"
          ],
          "exp": "Queue process'ler arası güvenli veri aktarımı sağlar"
        },
        {
          "code": "p.<span class=\"hl\">___</span>()  # process başlat",
          "ans": "start",
          "opts": [
            "start",
            "run",
            "begin",
            "fork",
            "spawn"
          ],
          "exp": "start() process'i başlatır"
        }
      ],
      "code": {
        "task": "ProcessPoolExecutor kullanarak 1-8 sayılarının faktöriyelini paralel hesapla. Her hesaplama için modül seviyesinde faktoriyel fonksiyonu tanımla. Sonuçları yazdır.",
        "starter": "from concurrent.futures import ProcessPoolExecutor\n\ndef faktoriyel(n):\n    sonuc = 1\n    for i in range(1, n + 1):\n        sonuc *= i\n    return sonuc\n\nif __name__ == '__main__':\n    sayilar = list(range(1, 9))\n    with ProcessPoolExecutor() as executor:\n        sonuclar = list(executor.map(faktoriyel, sayilar))\n    for n, s in zip(sayilar, sonuclar):\n        print(f\"{n}! = {s}\")",
        "checkFn": "(code)=>{const c=code;const p=(c.includes('ProcessPoolExecutor')?3:0)+(c.includes('executor.map')||c.includes('executor.submit')?3:0)+(c.includes('def faktoriyel')||c.includes('def hesapla')?2:0)+((c.match(/print/g)||[]).length>=1?2:0);return{pts:Math.min(p,10),max:10,ok:p>=6,msg:p>=8?'Parallel master! 🧵':p>=6?'Güzel multiprocessing!':'ProcessPoolExecutor ve map() kullan.'};",
        "hint": "if __name__ == '__main__' guard'ı unut. Modül seviyesinde def faktoriyel(n): tanımla."
      }
    }
  },
  {
    "id": "unit_test",
    "icon": "🧪",
    "locked": true,
    "title": "Unit Test",
    "desc": "unittest, assert metodları, setUp/tearDown, Mock — kodu güvenle değiştir.",
    "phases": {
      "lesson": "<div class=\"lesson-text\">\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--purple)\"></div><h3>Unit Test — Kodu Güvenle Değiştir</h3></div>\n    <p>Test olmayan kod: değişiklik yaptında her şeyin hâlâ çalışıp çalışmadığını bilmiyorsun. Test olan kod: değişiklik yaparsın, testleri çalıştırırsın, kırmızı varsa neyin bozulduğunu anında görürsün. <strong>Test güvenle değiştirme, refactoring ve büyüme imkânı verir.</strong></p>\n    <div class=\"box why\"><span class=\"box-icon\">🤔</span><span><strong>Neden test yaz, elle test etmek yetmez mi?</strong> Elle test: zahmetli, unutulur, her değişiklikte tekrar etmek gerekir. Otomatik test: tek komutla çalışır, 100ms'de 100 senaryo kontrol eder, CI/CD'de her commit'te otomatik çalışır, regresyon (eski hatanın geri gelmesi) anında görülür.</span></div>\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--blue)\"></div><h3>unittest — Dahili Test Çerçevesi</h3></div>\n    <div class=\"code-block runnable\"><div class=\"cb-header\"><div class=\"cb-dots\"></div><span class=\"cb-label\">unittest_ornek.py</span><span class=\"cb-run-tag\">▶</span></div><div class=\"cb-body\"><span class=\"kw\">import</span> unittest<br><br><span class=\"kw\">def</span> <span class=\"fn\">topla</span>(a, b): <span class=\"kw\">return</span> a + b<br><span class=\"kw\">def</span> <span class=\"fn\">bol</span>(a, b):<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">if</span> b == <span class=\"nm\">0</span>: <span class=\"kw\">raise</span> <span class=\"fn\">ZeroDivisionError</span>(<span class=\"st\">\"Sıfıra bölme\"</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">return</span> a / b<br><br><span class=\"kw\">class</span> <span class=\"fn\">MatematikTestleri</span>(<span class=\"fn\">unittest</span>.<span class=\"fn\">TestCase</span>):<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">def</span> <span class=\"fn\">test_toplama_pozitif</span>(<span class=\"kw\">self</span>):<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">self</span>.<span class=\"fn\">assertEqual</span>(<span class=\"fn\">topla</span>(<span class=\"nm\">3</span>, <span class=\"nm\">4</span>), <span class=\"nm\">7</span>)<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">def</span> <span class=\"fn\">test_toplama_negatif</span>(<span class=\"kw\">self</span>):<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">self</span>.<span class=\"fn\">assertEqual</span>(<span class=\"fn\">topla</span>(-<span class=\"nm\">3</span>, <span class=\"nm\">3</span>), <span class=\"nm\">0</span>)<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">def</span> <span class=\"fn\">test_bolme_sifir</span>(<span class=\"kw\">self</span>):<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">with</span> <span class=\"kw\">self</span>.<span class=\"fn\">assertRaises</span>(<span class=\"fn\">ZeroDivisionError</span>):<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"fn\">bol</span>(<span class=\"nm\">10</span>, <span class=\"nm\">0</span>)<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">def</span> <span class=\"fn\">test_bolme_normal</span>(<span class=\"kw\">self</span>):<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">self</span>.<span class=\"fn\">assertAlmostEqual</span>(<span class=\"fn\">bol</span>(<span class=\"nm\">10</span>, <span class=\"nm\">3</span>), <span class=\"nm\">3.333</span>, places=<span class=\"nm\">2</span>)<br><br><span class=\"kw\">if</span> __name__ == <span class=\"st\">\"__main__\"</span>:<br>&nbsp;&nbsp;&nbsp;&nbsp;unittest.<span class=\"fn\">main</span>()</div><textarea class=\"cb-src\" style=\"display:none\">import unittest\ndef topla(a, b): return a + b\ndef bol(a, b):\n    if b == 0: raise ZeroDivisionError(\"Sifira bolme\")\n    return a / b\nclass MatematikTestleri(unittest.TestCase):\n    def test_toplama_pozitif(self):\n        self.assertEqual(topla(3, 4), 7)\n    def test_toplama_negatif(self):\n        self.assertEqual(topla(-3, 3), 0)\n    def test_bolme_sifir(self):\n        with self.assertRaises(ZeroDivisionError):\n            bol(10, 0)\n    def test_bolme_normal(self):\n        self.assertAlmostEqual(bol(10, 3), 3.333, places=2)\nif __name__ == \"__main__\":\n    unittest.main(verbosity=2)</textarea></div>\n    <div class=\"box tip\"><span class=\"box-icon\">💡</span><span><strong>Assert metodları:</strong> assertEqual(a,b) — eşit mi. assertNotEqual — eşit değil. assertTrue/assertFalse — bool. assertRaises — exception fırlatıyor mu. assertIn — koleksiyonda mı. assertAlmostEqual — float karşılaştırma (places=N hassasiyeti).</span></div>\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--green)\"></div><h3>setUp ve tearDown — Test Fikstürleri</h3></div>\n    <div class=\"code-block runnable\"><div class=\"cb-header\"><div class=\"cb-dots\"></div><span class=\"cb-label\">setup_teardown.py</span><span class=\"cb-run-tag\">▶</span></div><div class=\"cb-body\"><span class=\"kw\">class</span> <span class=\"fn\">SepetTestleri</span>(<span class=\"fn\">unittest</span>.<span class=\"fn\">TestCase</span>):<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">def</span> <span class=\"fn\">setUp</span>(<span class=\"kw\">self</span>):<span class=\"cm\">  # her testten ÖNCE</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">self</span>.sepet = [<span class=\"st\">\"elma\"</span>, <span class=\"st\">\"armut\"</span>]<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">def</span> <span class=\"fn\">tearDown</span>(<span class=\"kw\">self</span>):<span class=\"cm\">  # her testten SONRA</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">self</span>.sepet = []<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">def</span> <span class=\"fn\">test_uzunluk</span>(<span class=\"kw\">self</span>):<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">self</span>.<span class=\"fn\">assertEqual</span>(<span class=\"fn\">len</span>(<span class=\"kw\">self</span>.sepet), <span class=\"nm\">2</span>)<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">def</span> <span class=\"fn\">test_elma_var</span>(<span class=\"kw\">self</span>):<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">self</span>.<span class=\"fn\">assertIn</span>(<span class=\"st\">\"elma\"</span>, <span class=\"kw\">self</span>.sepet)<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">def</span> <span class=\"fn\">test_ekle</span>(<span class=\"kw\">self</span>):<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">self</span>.sepet.<span class=\"fn\">append</span>(<span class=\"st\">\"muz\"</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">self</span>.<span class=\"fn\">assertEqual</span>(<span class=\"fn\">len</span>(<span class=\"kw\">self</span>.sepet), <span class=\"nm\">3</span>)</div><textarea class=\"cb-src\" style=\"display:none\">import unittest\nclass SepetTestleri(unittest.TestCase):\n    def setUp(self):\n        self.sepet = [\"elma\", \"armut\"]\n    def tearDown(self):\n        self.sepet = []\n    def test_uzunluk(self):\n        self.assertEqual(len(self.sepet), 2)\n    def test_elma_var(self):\n        self.assertIn(\"elma\", self.sepet)\n    def test_ekle(self):\n        self.sepet.append(\"muz\")\n        self.assertEqual(len(self.sepet), 3)\nif __name__ == \"__main__\":\n    unittest.main(verbosity=2)</textarea></div>\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--amber)\"></div><h3>Mock — Bağımlılıkları Taklit Et</h3></div>\n    <div class=\"code-block runnable\"><div class=\"cb-header\"><div class=\"cb-dots\"></div><span class=\"cb-label\">mock.py</span><span class=\"cb-run-tag\">▶</span></div><div class=\"cb-body\"><span class=\"kw\">from</span> unittest.mock <span class=\"kw\">import</span> patch, MagicMock<br><span class=\"kw\">import</span> unittest<br><br><span class=\"kw\">def</span> <span class=\"fn\">kullanici_getir</span>(user_id):<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"cm\"># Gerçekte API çağrısı</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">return</span> {<span class=\"st\">\"id\"</span>: user_id, <span class=\"st\">\"ad\"</span>: <span class=\"st\">\"Ali\"</span>}<br><br><span class=\"kw\">class</span> <span class=\"fn\">APITestleri</span>(<span class=\"fn\">unittest</span>.<span class=\"fn\">TestCase</span>):<br>&nbsp;&nbsp;&nbsp;&nbsp;@patch(<span class=\"st\">\"__main__.kullanici_getir\"</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">def</span> <span class=\"fn\">test_kullanici</span>(<span class=\"kw\">self</span>, mock_api):<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mock_api.<span class=\"fn\">return_value</span> = {<span class=\"st\">\"id\"</span>: <span class=\"nm\">1</span>, <span class=\"st\">\"ad\"</span>: <span class=\"st\">\"Test\"</span>}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sonuc = <span class=\"fn\">kullanici_getir</span>(<span class=\"nm\">1</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">self</span>.<span class=\"fn\">assertEqual</span>(sonuc[<span class=\"st\">\"ad\"</span>], <span class=\"st\">\"Test\"</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mock_api.<span class=\"fn\">assert_called_once_with</span>(<span class=\"nm\">1</span>)</div><textarea class=\"cb-src\" style=\"display:none\">from unittest.mock import patch\nimport unittest\ndef kullanici_getir(uid):\n    return {\"id\": uid, \"ad\": \"Ali\"}\nclass APITestleri(unittest.TestCase):\n    @patch(\"__main__.kullanici_getir\")\n    def test_kullanici(self, mock_api):\n        mock_api.return_value = {\"id\": 1, \"ad\": \"Test\"}\n        sonuc = kullanici_getir(1)\n        self.assertEqual(sonuc[\"ad\"], \"Test\")\n        mock_api.assert_called_once_with(1)\nif __name__ == \"__main__\":\n    unittest.main(verbosity=2)</textarea></div>\n    <div class=\"box alt\"><span class=\"box-icon\">⚖️</span><span><strong>unittest vs pytest:</strong> unittest: dahili, verbose, class zorunlu. pytest: kurulum gerekir (pip install), daha az kod, assert yeterli (assertEqual yerine), fixture sistemi güçlü, plugin ekosistemi zengin. Gerçek projelerde pytest tercih edilir — unittest alt yapısıyla uyumlu.</span></div>\n    <div class=\"box deep\"><span class=\"box-icon\">🧠</span><span><strong>Test piramidi:</strong> Unit test (çok, hızlı, ucuz) → Integration test (orta) → E2E test (az, yavaş, pahalı). Unit test izole çalışır — dış bağımlılık yok, mock kullanılır. 100ms'de 1000 unit test çalışabilir. E2E test gerçek browser/API açar — dakikalar sürer.</span></div>\n    <div class=\"lesson-nav\"><button class=\"nav-btn go\" onclick=\"switchPhase(1)\">🧠 Teste Geç →</button></div>\n  </div>",
      "quiz": [
        {
          "q": "setUp() metodu ne zaman çağrılır?",
          "opts": [
            "Sınıf oluşturulduğunda",
            "Her test metodundan önce",
            "Tüm testler bitmeden önce bir kez",
            "Test başarısız olduğunda"
          ],
          "ans": 1,
          "exp": "setUp() her test metodundan önce çağrılır — temiz test ortamı sağlar. tearDown() her test metodundan sonra çalışır — temizlik yapar. Her test bağımsız başlar."
        },
        {
          "q": "assertRaises nasıl kullanılır?",
          "opts": [
            "try/except ile",
            "with self.assertRaises(ExceptionTipi): içinde hata fırlatan kodu yaz",
            "Sadece assert ile",
            "return ile"
          ],
          "ans": 1,
          "exp": "with self.assertRaises(ZeroDivisionError): bloğu içindeki kod bu exception'ı fırlatmazsa test başarısız olur. Exception beklenen bir davranışı test eder."
        },
        {
          "q": "Mock neden kullanılır?",
          "opts": [
            "Daha hızlı kod için",
            "Gerçek API/DB yerine sahte nesne — test bağımsız, hızlı, deterministik",
            "Hata gizlemek için",
            "Production'da da kullanılır"
          ],
          "ans": 1,
          "exp": "Mock: dış bağımlılıkları (API, DB, dosya) taklit eder. Test gerçek ağa bağlanmaz — hızlı, izole, her koşulda aynı sonuç. return_value ve side_effect ile davranış tanımlanır."
        },
        {
          "q": "Test metodunun adı neden test_ ile başlamalı?",
          "opts": [
            "Python kuralı",
            "unittest bu prefix'li metodları otomatik test olarak bulur ve çalıştırır",
            "Okunabilirlik",
            "Başka yol yok"
          ],
          "ans": 1,
          "exp": "unittest test discovery: TestCase alt sınıflarında test_ ile başlayan tüm metodları otomatik bulur. Prefix olmadan metod test olarak çalıştırılmaz."
        },
        {
          "q": "assertAlmostEqual ne zaman tercih edilir?",
          "opts": [
            "Her zaman",
            "Float karşılaştırmada — 1/3 + 2/3 == 1 False verebilir, yaklaşık eşitlik lazım",
            "Int için",
            "String için"
          ],
          "ans": 1,
          "exp": "Float aritmetik: 0.1 + 0.2 = 0.30000000000000004. assertEqual başarısız olur. assertAlmostEqual(a, b, places=7) ondalık hassasiyetiyle karşılaştırır."
        }
      ],
      "fills": [
        {
          "code": "<span class=\"kw\">class</span> <span class=\"fn\">TestSinifi</span>(<input class=\"blank\" data-ans=\"unittest.TestCase\" placeholder=\"?\" style=\"width:145px\">):",
          "hint": "Test sınıfı üst sınıfı"
        },
        {
          "code": "&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">def</span> <input class=\"blank\" data-ans=\"setUp\" placeholder=\"?\" style=\"width:52px\">(<span class=\"kw\">self</span>):<span class=\"cm\">  # her testten önce</span>",
          "hint": "Hazırlık metodu"
        },
        {
          "code": "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">self</span>.<input class=\"blank\" data-ans=\"assertEqual\" placeholder=\"?\" style=\"width:90px\">(topla(3,4), 7)",
          "hint": "Eşitlik assert'i"
        },
        {
          "code": "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">with</span> <span class=\"kw\">self</span>.<input class=\"blank\" data-ans=\"assertRaises\" placeholder=\"?\" style=\"width:100px\">(<span class=\"fn\">ValueError</span>):",
          "hint": "Exception bekleme"
        },
        {
          "code": "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">self</span>.<input class=\"blank\" data-ans=\"assertIn\" placeholder=\"?\" style=\"width:72px\">(<span class=\"st\">\"elma\"</span>, liste)",
          "hint": "Koleksiyonda arama assert"
        }
      ],
      "drag": [
        {
          "code": "class Testler(<span class=\"hl\">___</span>.TestCase):",
          "ans": "unittest",
          "opts": [
            "unittest",
            "pytest",
            "testing",
            "mock",
            "assert"
          ],
          "exp": "unittest.TestCase test sınıfının üst sınıfı"
        },
        {
          "code": "self.<span class=\"hl\">___</span>(topla(3,4), 7)  # eşit mi?",
          "ans": "assertEqual",
          "opts": [
            "assertEqual",
            "assertTrue",
            "assertIs",
            "assertIn",
            "assertNone"
          ],
          "exp": "assertEqual(gerçek, beklenen) — eşit değilse test başarısız"
        },
        {
          "code": "def <span class=\"hl\">___</span>(self):  # her testten önce",
          "ans": "setUp",
          "opts": [
            "setUp",
            "setup",
            "prepare",
            "init",
            "before"
          ],
          "exp": "setUp her test metodundan önce otomatik çağrılır"
        },
        {
          "code": "with self.<span class=\"hl\">___</span>(ZeroDivisionError):",
          "ans": "assertRaises",
          "opts": [
            "assertRaises",
            "assertError",
            "expectError",
            "checkRaises",
            "withRaises"
          ],
          "exp": "assertRaises exception fırlatılıyor mu kontrol eder"
        },
        {
          "code": "@<span class=\"hl\">___</span>('modul.fonksiyon')  # taklit et",
          "ans": "patch",
          "opts": [
            "patch",
            "mock",
            "fake",
            "replace",
            "stub"
          ],
          "exp": "patch dekoratörü fonksiyonu mock ile değiştirir"
        }
      ],
      "code": {
        "task": "BankaHesabi sınıfı için unit testler yaz. setUp'ta 1000 TL bakiyeli hesap oluştur. Test: para_yatir(500) bakiyeyi 1500 yapar. Test: para_cek(200) bakiyeyi 800 yapar. Test: para_cek(2000) yetersiz bakiye ValueError fırlatır.",
        "starter": "import unittest\n\nclass BankaHesabi:\n    def __init__(self, bakiye=0):\n        self.bakiye = bakiye\n    def para_yatir(self, m):\n        if m <= 0: raise ValueError('Pozitif gir')\n        self.bakiye += m\n    def para_cek(self, m):\n        if m > self.bakiye: raise ValueError('Yetersiz bakiye')\n        self.bakiye -= m\n\nclass BankaTestleri(unittest.TestCase):\n    def setUp(self):\n        self.hesap = BankaHesabi(1000)\n    \n    def test_yatirma(self):\n        self.hesap.para_yatir(500)\n        self.assertEqual(self.hesap.bakiye, 1500)\n    \n    def test_cekme(self):\n        self.hesap.para_cek(200)\n        self.assertEqual(self.hesap.bakiye, 800)\n    \n    def test_yetersiz_bakiye(self):\n        with self.assertRaises(ValueError):\n            self.hesap.para_cek(2000)\n\nif __name__ == '__main__':\n    unittest.main(verbosity=2)",
        "checkFn": "(code)=>{const c=code;const p=(c.includes('unittest.TestCase')?2:0)+(c.includes('setUp')?2:0)+(c.includes('assertEqual')?2:0)+(c.includes('assertRaises')?2:0)+((c.match(/def test_/g)||[]).length>=2?2:0);return{pts:Math.min(p,10),max:10,ok:p>=6,msg:p>=8?'Test ustasi! 🧪':p>=6?'Güzel testler!':'setUp, assertEqual, assertRaises yaz.'};",
        "hint": "setUp'ta self.hesap = BankaHesabi(1000). Her test metodu test_ ile başlamalı. assertRaises için with bloğu kullan."
      }
    }
  },
  {
    "id": "logging_module",
    "icon": "📊",
    "locked": true,
    "title": "Logging",
    "desc": "logging modülü, handler, formatter, seviyeler — print'in ötesine geç.",
    "phases": {
      "lesson": "<div class=\"lesson-text\">\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--purple)\"></div><h3>Logging — print'ten Büyü</h3></div>\n    <p>print() debug için başlangıçta işe yarar ama production'da yetersiz: seviye yok, nereye yazılacağı belli değil, performansı etkiler, kapatmak için her yeri değiştirmen gerekir. <code>logging</code> modülü bunu çözer — seviye, format, hedef, filtre hepsi yapılandırılabilir.</p>\n    <div class=\"box why\"><span class=\"box-icon\">🤔</span><span><strong>Neden logging?</strong> Production'da bir hata oluştu. print() koymuştun ama konsol yok. logging ile: dosyaya yaz, uzak sunucuya gönder, e-posta at. Seviyelerle: DEBUG geliştirmede aç, WARNING ve üstü production'da göster. Kod değişmeden konfigürasyon değişir.</span></div>\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--blue)\"></div><h3>Log Seviyeleri ve Temel Kullanım</h3></div>\n    <div class=\"code-block runnable\"><div class=\"cb-header\"><div class=\"cb-dots\"></div><span class=\"cb-label\">logging_temel.py</span><span class=\"cb-run-tag\">▶</span></div><div class=\"cb-body\"><span class=\"kw\">import</span> logging<br><br><span class=\"cm\"># Temel konfigürasyon</span><br>logging.<span class=\"fn\">basicConfig</span>(<br>&nbsp;&nbsp;&nbsp;&nbsp;level=logging.<span class=\"fn\">DEBUG</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;format=<span class=\"st\">\"%(asctime)s [%(levelname)s] %(name)s: %(message)s\"</span><br>)<br><br>logger = logging.<span class=\"fn\">getLogger</span>(<span class=\"st\">\"benim_app\"</span>)<br><br>logger.<span class=\"fn\">debug</span>(<span class=\"st\">\"Debug: değişken x=42\"</span>)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"cm\"># geliştirme</span><br>logger.<span class=\"fn\">info</span>(<span class=\"st\">\"Kullanıcı giriş yaptı\"</span>)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"cm\"># bilgi</span><br>logger.<span class=\"fn\">warning</span>(<span class=\"st\">\"Disk %90 dolu\"</span>)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"cm\"># uyarı</span><br>logger.<span class=\"fn\">error</span>(<span class=\"st\">\"Veritabanı bağlanamadı\"</span>)&nbsp;<span class=\"cm\"># hata</span><br>logger.<span class=\"fn\">critical</span>(<span class=\"st\">\"Sistem çöktü!\"</span>)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"cm\"># kritik</span><br><br><span class=\"cm\"># Seviyeler: DEBUG(10) < INFO(20) < WARNING(30) < ERROR(40) < CRITICAL(50)</span><br><span class=\"cm\"># basicConfig level=WARNING → DEBUG ve INFO gösterilmez</span></div><textarea class=\"cb-src\" style=\"display:none\">import logging\nlogging.basicConfig(\n    level=logging.DEBUG,\n    format=\"%(asctime)s [%(levelname)s] %(name)s: %(message)s\"\n)\nlogger = logging.getLogger(\"benim_app\")\nlogger.debug(\"Debug: degisken\")\nlogger.info(\"Kullanici giris yapti\")\nlogger.warning(\"Disk 90 dolu\")\nlogger.error(\"Veritabani baglanamadi\")\nlogger.critical(\"Sistem coktu!\")</textarea></div>\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--green)\"></div><h3>Handler ve Formatter — Nereye Nasıl Yaz</h3></div>\n    <div class=\"code-block runnable\"><div class=\"cb-header\"><div class=\"cb-dots\"></div><span class=\"cb-label\">handler_fmt.py</span><span class=\"cb-run-tag\">▶</span></div><div class=\"cb-body\"><span class=\"kw\">import</span> logging<br><br>logger = logging.<span class=\"fn\">getLogger</span>(<span class=\"st\">\"uygulama\"</span>)<br>logger.<span class=\"fn\">setLevel</span>(logging.<span class=\"fn\">DEBUG</span>)<br><br><span class=\"cm\"># Konsola yaz</span><br>konsol = logging.<span class=\"fn\">StreamHandler</span>()<br>konsol.<span class=\"fn\">setLevel</span>(logging.<span class=\"fn\">WARNING</span>)<br><br><span class=\"cm\"># Dosyaya yaz</span><br>dosya = logging.<span class=\"fn\">FileHandler</span>(<span class=\"st\">\"app.log\"</span>)<br>dosya.<span class=\"fn\">setLevel</span>(logging.<span class=\"fn\">DEBUG</span>)<br><br><span class=\"cm\"># Format</span><br>fmt = logging.<span class=\"fn\">Formatter</span>(<span class=\"st\">\"[%(levelname)s] %(message)s\"</span>)<br>konsol.<span class=\"fn\">setFormatter</span>(fmt)<br>dosya.<span class=\"fn\">setFormatter</span>(fmt)<br><br>logger.<span class=\"fn\">addHandler</span>(konsol)<br>logger.<span class=\"fn\">addHandler</span>(dosya)<br><br>logger.<span class=\"fn\">debug</span>(<span class=\"st\">\"Dosyaya gider, konsola değil\"</span>)<br>logger.<span class=\"fn\">warning</span>(<span class=\"st\">\"Her ikisine de gider\"</span>)</div><textarea class=\"cb-src\" style=\"display:none\">import logging\nlogger = logging.getLogger(\"uygulama\")\nlogger.setLevel(logging.DEBUG)\nkonsol = logging.StreamHandler()\nkonsol.setLevel(logging.WARNING)\nfmt = logging.Formatter(\"[%(levelname)s] %(message)s\")\nkonsol.setFormatter(fmt)\nlogger.addHandler(konsol)\nlogger.debug(\"Sadece dosyaya\")\nlogger.warning(\"Konsola da gider\")\nlogger.error(\"Hata mesaji\")</textarea></div>\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--amber)\"></div><h3>Exception Logging ve Context</h3></div>\n    <div class=\"code-block runnable\"><div class=\"cb-header\"><div class=\"cb-dots\"></div><span class=\"cb-label\">exception_log.py</span><span class=\"cb-run-tag\">▶</span></div><div class=\"cb-body\"><span class=\"kw\">import</span> logging<br>logger = logging.<span class=\"fn\">getLogger</span>(<span class=\"st\">\"app\"</span>)<br>logging.<span class=\"fn\">basicConfig</span>(level=logging.<span class=\"fn\">DEBUG</span>)<br><br><span class=\"kw\">def</span> <span class=\"fn\">bolme_yap</span>(a, b):<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">try</span>:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sonuc = a / b<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;logger.<span class=\"fn\">info</span>(<span class=\"st\">f\"{a}/{b} = {sonuc}\"</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">return</span> sonuc<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">except</span> <span class=\"fn\">ZeroDivisionError</span>:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;logger.<span class=\"fn\">exception</span>(<span class=\"st\">\"Sıfıra bölme hatası\"</span>)<span class=\"cm\"> # traceback dahil!</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">return</span> <span class=\"kw\">None</span><br><br><span class=\"cm\"># extra ile bağlam bilgisi</span><br>logger.<span class=\"fn\">info</span>(<span class=\"st\">\"İşlem tamamlandı\"</span>, extra={<span class=\"st\">\"user_id\"</span>: <span class=\"nm\">42</span>})<br><br><span class=\"fn\">bolme_yap</span>(<span class=\"nm\">10</span>, <span class=\"nm\">0</span>)<span class=\"cm\">  # traceback loglanır</span></div><textarea class=\"cb-src\" style=\"display:none\">import logging\nlogger = logging.getLogger(\"app\")\nlogging.basicConfig(level=logging.DEBUG)\ndef bolme_yap(a, b):\n    try:\n        sonuc = a / b\n        logger.info(f\"{a}/{b} = {sonuc}\")\n        return sonuc\n    except ZeroDivisionError:\n        logger.exception(\"Sifira bolme hatasi\")\n        return None\nbolme_yap(10, 2)\nbolme_yap(10, 0)</textarea></div>\n    <div class=\"box tip\"><span class=\"box-icon\">💡</span><span><strong>logger.exception() vs logger.error():</strong> exception() ERROR seviyesinde loglar VE otomatik olarak mevcut exception'ın traceback'ini ekler. except bloğunda kullan. error() sadece mesajı loglar.</span></div>\n    <div class=\"box alt\"><span class=\"box-icon\">⚖️</span><span><strong>print() mi logging mi?</strong> Script/tek kullanımlık: print yeterli. Kütüphane/modül: hiçbir zaman print koyma — kullanıcının logging konfigürasyonunu boz. Uygulama: logging — seviye, hedef ve format konfigüre edilebilir.</span></div>\n    <div class=\"box warn\"><span class=\"box-icon\">⚠️</span><span><strong>basicConfig iki kez çalışmaz!</strong> basicConfig root logger zaten handler'a sahipse hiçbir şey yapmaz. Bunu bilerek tasarla: ya sadece başlangıçta basicConfig çağır ya da getLogger ile logger oluşturup manuel handler ekle.</span></div>\n    <div class=\"lesson-nav\"><button class=\"nav-btn go\" onclick=\"switchPhase(1)\">🧠 Teste Geç →</button></div>\n  </div>",
      "quiz": [
        {
          "q": "Log seviyeleri doğru sırayla hangisi?",
          "opts": [
            "INFO < DEBUG < WARNING",
            "DEBUG < INFO < WARNING < ERROR < CRITICAL",
            "WARNING < INFO < DEBUG",
            "ERROR < WARNING < INFO"
          ],
          "ans": 1,
          "exp": "DEBUG(10) < INFO(20) < WARNING(30) < ERROR(40) < CRITICAL(50). basicConfig(level=WARNING) ayarlandığında DEBUG ve INFO mesajları gösterilmez."
        },
        {
          "q": "Handler neden kullanılır?",
          "opts": [
            "Log seviyesini ayarlar",
            "Log mesajlarının nereye yazılacağını belirler — konsol, dosya, e-posta",
            "Logger oluşturur",
            "Formatter belirler"
          ],
          "ans": 1,
          "exp": "Handler çıktı hedefini belirler. StreamHandler → konsol. FileHandler → dosya. RotatingFileHandler → dönen dosya. Her logger'a birden fazla handler eklenebilir."
        },
        {
          "q": "logger.exception() kullanmanın avantajı?",
          "opts": [
            "Daha hızlı",
            "ERROR seviyesinde loglar ve otomatik traceback ekler",
            "Exception'ı yakalar",
            "Silent fail yapar"
          ],
          "ans": 1,
          "exp": "exception() except bloğunda kullanılır — mevcut exception bilgisini otomatik ekler. Sadece hata mesajı değil, hangi satırda ne olduğu da loglara girer."
        },
        {
          "q": "Neden kütüphanelere print() konmamalı?",
          "opts": [
            "Print yavaş",
            "Kütüphaneyi kullanan uygulamanın logging konfigürasyonunu bozar — çıktıyı kontrol edemez",
            "Sözleşme",
            "Güvenlik"
          ],
          "ans": 1,
          "exp": "Kütüphane kullanıcısı print'i kapatamaz — sadece logging.getLogger('kütüphane').setLevel(CRITICAL) ile susturabilir. Kütüphaneler her zaman logging kullanmalı, hiç print koymamalı."
        },
        {
          "q": "logging.basicConfig() neden iki kez çalışmaz?",
          "opts": [
            "Python kısıtlaması",
            "Root logger zaten handler'a sahipse basicConfig hiçbir şey yapmaz",
            "İkinci çağrı override eder",
            "Her ikisi de çalışır"
          ],
          "ans": 1,
          "exp": "basicConfig: root logger'ın handler'ı yoksa konfigüre eder. Zaten varsa (önceki basicConfig veya addHandler) sessizce yoksayar. Bu tasarım kararı — en erken çağrı kazanır."
        }
      ],
      "fills": [
        {
          "code": "logger = logging.<input class=\"blank\" data-ans=\"getLogger\" placeholder=\"?\" style=\"width:85px\">(<span class=\"st\">\"app\"</span>)",
          "hint": "Logger alma fonksiyonu"
        },
        {
          "code": "logger.<input class=\"blank\" data-ans=\"setLevel\" placeholder=\"?\" style=\"width:75px\">(logging.<input class=\"blank\" data-ans=\"DEBUG\" placeholder=\"?\" style=\"width:52px\">)",
          "hint": "Seviye ayarlama"
        },
        {
          "code": "handler = logging.<input class=\"blank\" data-ans=\"FileHandler\" placeholder=\"?\" style=\"width:95px\">(<span class=\"st\">\"app.log\"</span>)",
          "hint": "Dosya handler sınıfı"
        },
        {
          "code": "logger.<input class=\"blank\" data-ans=\"addHandler\" placeholder=\"?\" style=\"width:85px\">(handler)<span class=\"cm\">  # handler ekle</span>",
          "hint": "Handler ekleme metodu"
        },
        {
          "code": "logger.<input class=\"blank\" data-ans=\"exception\" placeholder=\"?\" style=\"width:82px\">(<span class=\"st\">\"Hata!\"</span>)<span class=\"cm\">  # traceback dahil</span>",
          "hint": "Traceback ile loglama"
        }
      ],
      "drag": [
        {
          "code": "logger = logging.<span class=\"hl\">___</span>('app')",
          "ans": "getLogger",
          "opts": [
            "getLogger",
            "Logger",
            "createLogger",
            "newLogger",
            "makeLogger"
          ],
          "exp": "getLogger modül/sınıf başına bir logger alır — aynı isimle çağrılırsa aynı logger döner"
        },
        {
          "code": "handler = logging.<span class=\"hl\">___</span>()  # konsol",
          "ans": "StreamHandler",
          "opts": [
            "StreamHandler",
            "FileHandler",
            "RotatingHandler",
            "ConsoleHandler",
            "PrintHandler"
          ],
          "exp": "StreamHandler stdout/stderr'e yazar"
        },
        {
          "code": "handler = logging.<span class=\"hl\">___</span>('app.log')",
          "ans": "FileHandler",
          "opts": [
            "FileHandler",
            "StreamHandler",
            "LogHandler",
            "WriteHandler",
            "OutputHandler"
          ],
          "exp": "FileHandler log dosyasına yazar"
        },
        {
          "code": "logger.<span class=\"hl\">___</span>('Sadece debug')",
          "ans": "debug",
          "opts": [
            "debug",
            "info",
            "warning",
            "error",
            "critical"
          ],
          "exp": "En düşük seviye — geliştirmede detaylı bilgi"
        },
        {
          "code": "logger.<span class=\"hl\">___</span>('Traceback dahil')",
          "ans": "exception",
          "opts": [
            "exception",
            "error",
            "critical",
            "traceback",
            "fatal"
          ],
          "exp": "exception() except bloğunda traceback'i otomatik ekler"
        }
      ],
      "code": {
        "task": "Hem konsola hem dosyaya yazan bir logger konfigüre et. Konsol sadece WARNING ve üstünü göstersin. Dosya DEBUG ve üstünü yazsın. Format: '[SEVİYE] mesaj' olsun. Farklı seviyelerde mesajlar gönder.",
        "starter": "import logging\n\n# Logger oluştur\nlogger = logging.getLogger('pylab')\nlogger.setLevel(logging.DEBUG)\n\n# Konsol handler (WARNING+)\nkonsol = logging.StreamHandler()\nkonsol.setLevel(logging.WARNING)\n\n# Format\nfmt = logging.Formatter('[%(levelname)s] %(message)s')\nkonsol.setFormatter(fmt)\n\n# Logger'a ekle\nlogger.addHandler(konsol)\n\n# Test\nlogger.debug('Bu sadece dosyaya giderdi')\nlogger.info('Bu da sadece dosyaya')\nlogger.warning('Bu konsolda gorunur!')\nlogger.error('Bu da konsolda!')\nlogger.critical('Kritik!')",
        "checkFn": "(code)=>{const c=code;const p=(c.includes('getLogger')?2:0)+(c.includes('setLevel')?2:0)+(c.includes('StreamHandler')||c.includes('FileHandler')?2:0)+(c.includes('Formatter')?2:0)+((c.match(/logger\\.(debug|info|warning|error|critical)/g)||[]).length>=3?2:0);return{pts:Math.min(p,10),max:10,ok:p>=6,msg:p>=8?'Log ustasi! 📊':p>=6?'Güzel logging!':'getLogger, setLevel, handler, Formatter kullan.'};",
        "hint": "getLogger → setLevel(DEBUG) → StreamHandler → setLevel(WARNING) → Formatter → setFormatter → addHandler"
      }
    }
  },
  {
    "id": "performance",
    "icon": "⚡",
    "locked": true,
    "title": "Performans & Profiling",
    "desc": "timeit, cProfile, pstats — önce ölç sonra optimize et.",
    "phases": {
      "lesson": "<div class=\"lesson-text\">\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--purple)\"></div><h3>Performans & Profiling — Gerçek Darboğazı Bul</h3></div>\n    <p>\"Kodum yavaş, nereden başlayayım?\" — tahmine dayalı optimizasyon zamanın %80'ini yanlış yere harcar. Kural: <strong>önce ölç, sonra optimize et</strong>. Profiler gerçek darboğazı gösterir — genellikle düşündüğün yer değildir.</p>\n    <div class=\"box why\"><span class=\"box-icon\">🤔</span><span><strong>Neden profiling?</strong> 10.000 satırlık kodda tek bir fonksiyon zamanın %90'ını yiyebilir. O fonksiyonu optimize etmek tüm uygulamayı hızlandırır. Geri kalan %99'u optimize etmen hiçbir fark yaratmaz. Veri olmadan optimizasyon karanlıkta çalışmaktır.</span></div>\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--blue)\"></div><h3>timeit — Mikro Benchmark</h3></div>\n    <div class=\"code-block runnable\"><div class=\"cb-header\"><div class=\"cb-dots\"></div><span class=\"cb-label\">timeit_ornek.py</span><span class=\"cb-run-tag\">▶</span></div><div class=\"cb-body\"><span class=\"kw\">import</span> timeit<br><br><span class=\"cm\"># String birleştirme: + vs join</span><br><span class=\"kw\">def</span> <span class=\"fn\">toplama</span>():<br>&nbsp;&nbsp;&nbsp;&nbsp;s = <span class=\"st\">\"\"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">for</span> i <span class=\"kw\">in</span> <span class=\"fn\">range</span>(<span class=\"nm\">1000</span>):<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;s += <span class=\"fn\">str</span>(i)<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">return</span> s<br><br><span class=\"kw\">def</span> <span class=\"fn\">join_yontemi</span>():<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">return</span> <span class=\"st\">\"\"</span>.<span class=\"fn\">join</span>(<span class=\"fn\">str</span>(i) <span class=\"kw\">for</span> i <span class=\"kw\">in</span> <span class=\"fn\">range</span>(<span class=\"nm\">1000</span>))<br><br>t1 = timeit.<span class=\"fn\">timeit</span>(<span class=\"fn\">toplama</span>, number=<span class=\"nm\">1000</span>)<br>t2 = timeit.<span class=\"fn\">timeit</span>(<span class=\"fn\">join_yontemi</span>, number=<span class=\"nm\">1000</span>)<br><span class=\"fn\">print</span>(<span class=\"st\">f\"+: {t1:.3f}s\"</span>)<br><span class=\"fn\">print</span>(<span class=\"st\">f\"join: {t2:.3f}s\"</span>)<br><span class=\"fn\">print</span>(<span class=\"st\">f\"join {t1/t2:.1f}x hızlı\"</span>)</div><textarea class=\"cb-src\" style=\"display:none\">import timeit\ndef toplama():\n    s = \"\"\n    for i in range(1000):\n        s += str(i)\n    return s\ndef join_yontemi():\n    return \"\".join(str(i) for i in range(1000))\nt1 = timeit.timeit(toplama, number=1000)\nt2 = timeit.timeit(join_yontemi, number=1000)\nprint(f\"+: {t1:.3f}s\")\nprint(f\"join: {t2:.3f}s\")\nprint(f\"join {t1/t2:.1f}x hizli\")</textarea></div>\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--green)\"></div><h3>cProfile — Fonksiyon Başına Süre</h3></div>\n    <div class=\"code-block runnable\"><div class=\"cb-header\"><div class=\"cb-dots\"></div><span class=\"cb-label\">cprofile.py</span><span class=\"cb-run-tag\">▶</span></div><div class=\"cb-body\"><span class=\"kw\">import</span> cProfile, pstats<br><br><span class=\"kw\">def</span> <span class=\"fn\">yavash</span>():<br>&nbsp;&nbsp;&nbsp;&nbsp;toplam = <span class=\"nm\">0</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">for</span> i <span class=\"kw\">in</span> <span class=\"fn\">range</span>(<span class=\"nm\">10000</span>):<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;toplam += i * i<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">return</span> toplam<br><br><span class=\"kw\">def</span> <span class=\"fn\">ana</span>():<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">for</span> _ <span class=\"kw\">in</span> <span class=\"fn\">range</span>(<span class=\"nm\">100</span>):<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"fn\">yavash</span>()<br><br><span class=\"cm\"># Profile et</span><br>profil = cProfile.<span class=\"fn\">Profile</span>()<br>profil.<span class=\"fn\">enable</span>()<br><span class=\"fn\">ana</span>()<br>profil.<span class=\"fn\">disable</span>()<br><br>istat = pstats.<span class=\"fn\">Stats</span>(profil)<br>istat.<span class=\"fn\">sort_stats</span>(<span class=\"st\">\"cumulative\"</span>)<br>istat.<span class=\"fn\">print_stats</span>(<span class=\"nm\">5</span>)<span class=\"cm\">  # ilk 5 fonksiyon</span></div><textarea class=\"cb-src\" style=\"display:none\">import cProfile, pstats\ndef yavash():\n    toplam = 0\n    for i in range(10000):\n        toplam += i * i\n    return toplam\ndef ana():\n    for _ in range(100):\n        yavash()\ncProfile.run(\"ana()\")</textarea></div>\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--amber)\"></div><h3>Hızlı Optimizasyon İpuçları</h3></div>\n    <table class='cmp-table'><tr><th>Yavaş</th><th>Hızlı</th><th>Neden?</th></tr><tr><td><code>s += x</code> döngüde</td><td><code>''.join(liste)</code></td><td>String immutable — her += yeni nesne</td></tr><tr><td><code>for x in liste: if x in liste2</code></td><td><code>set(liste2)</code> ile</td><td>set O(1), list O(n)</td></tr><tr><td><code>[f(x) for x in l]</code></td><td><code>map(f, l)</code></td><td>Küçük fark, büyük listede önemli</td></tr><tr><td><code>global değişken döngüde</code></td><td><code>local değişken</code></td><td>Local lookup daha hızlı</td></tr><tr><td><code>try/except</code> yok</td><td><code>EAFP stili</code></td><td>if kontrol yerine dene-yakala</td></tr></table>\n    <div class=\"code-block runnable\"><div class=\"cb-header\"><div class=\"cb-dots\"></div><span class=\"cb-label\">set_vs_list.py</span><span class=\"cb-run-tag\">▶</span></div><div class=\"cb-body\"><span class=\"kw\">import</span> timeit<br><br><span class=\"cm\"># Set vs List arama: O(1) vs O(n)</span><br>liste = <span class=\"fn\">list</span>(<span class=\"fn\">range</span>(<span class=\"nm\">10000</span>))<br>kume = <span class=\"fn\">set</span>(<span class=\"fn\">range</span>(<span class=\"nm\">10000</span>))<br><br>t_list = timeit.<span class=\"fn\">timeit</span>(<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">lambda</span>: <span class=\"nm\">9999</span> <span class=\"kw\">in</span> liste, number=<span class=\"nm\">10000</span>)<br>t_set = timeit.<span class=\"fn\">timeit</span>(<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">lambda</span>: <span class=\"nm\">9999</span> <span class=\"kw\">in</span> kume, number=<span class=\"nm\">10000</span>)<br><span class=\"fn\">print</span>(<span class=\"st\">f\"list: {t_list:.4f}s\"</span>)<br><span class=\"fn\">print</span>(<span class=\"st\">f\"set: {t_set:.4f}s  ({t_list/t_set:.0f}x hızlı)\"</span>)</div><textarea class=\"cb-src\" style=\"display:none\">import timeit\nliste = list(range(10000))\nkume = set(range(10000))\nt_list = timeit.timeit(lambda: 9999 in liste, number=10000)\nt_set = timeit.timeit(lambda: 9999 in kume, number=10000)\nprint(f\"list: {t_list:.4f}s\")\nprint(f\"set: {t_set:.4f}s ({t_list/t_set:.0f}x hizli)\")</textarea></div>\n    <div class=\"box deep\"><span class=\"box-icon\">🧠</span><span><strong>Big O ve Python veri yapıları:</strong> list.append O(1), list.insert(0) O(n), list.__contains__ O(n). dict.__contains__ O(1), set.__contains__ O(1). Büyük veride 'x in liste' yerine 'x in set(liste)' devrimsel fark yaratır.</span></div>\n    <div class=\"box alt\"><span class=\"box-icon\">⚖️</span><span><strong>PyPy ve Cython:</strong> Saf Python hızı yetmiyorsa PyPy (JIT derleyici, 5-10x hız) veya Cython (Python→C derleme). Kritik inner loop için C uzantısı da yazılabilir. Ama önce algoritma ve veri yapısı seçimini optimize et — o daha büyük etki yapar.</span></div>\n    <div class=\"lesson-nav\"><button class=\"nav-btn go\" onclick=\"switchPhase(1)\">🧠 Teste Geç →</button></div>\n  </div>",
      "quiz": [
        {
          "q": "Neden 'önce ölç, sonra optimize et' denir?",
          "opts": [
            "Ölçmek zorunlu",
            "Tahmine dayalı optimizasyon çoğunlukla yanlış yeri optimize eder — zaman kaybı",
            "Kural değil",
            "Profiler zorunlu"
          ],
          "ans": 1,
          "exp": "Performans sorunlarının %80'i kodun %20'sinde. Profiler olmadan genellikle yanlış yeri optimize edersin. Profiling darboğazı gösterir, gerçek kazanç oradan gelir."
        },
        {
          "q": "timeit.timeit() neden number parametresi alır?",
          "opts": [
            "Daha iyi görünüm",
            "Çok kez çalıştırarak ortalama alır — tek çalışma OS noise'dan etkilenir",
            "Zorunlu parametre",
            "Hız sınırı"
          ],
          "ans": 1,
          "exp": "Tek çalışma: OS, CPU, GC neden oluşan gürültüden etkilenir. timeit aynı kodu binlerce kez çalıştırır, toplam/sayı ile güvenilir ölçüm alır."
        },
        {
          "q": "list'te 'x in liste' neden yavaş?",
          "opts": [
            "List hatalı",
            "O(n) — sona kadar her eleman kontrol edilebilir",
            "Büyük liste değil",
            "Python hatası"
          ],
          "ans": 1,
          "exp": "list.__contains__: baştan sona lineer arama O(n). 10000 elemanlı listede 5000 karşılaştırma olabilir. set ve dict hash tablosu kullanır: O(1) arama."
        },
        {
          "q": "cProfile ne bilgi verir?",
          "opts": [
            "Bellek kullanımı",
            "Her fonksiyonun kaç kez çağrıldığı ve toplam/ortalama süresi",
            "Thread bilgisi",
            "Satır bazlı süre"
          ],
          "ans": 1,
          "exp": "cProfile: fonksiyon başına ncalls (çağrı sayısı), tottime (içindeki süre), cumtime (alt çağrılar dahil). Sort by cumulative: en çok zaman yiyen fonksiyon üstte."
        },
        {
          "q": "String birleştirmede + döngüde neden ''.join()'den yavaş?",
          "opts": [
            "join özel algoritmaya",
            "String immutable — her += yeni string nesnesi oluşturur, O(n²) bellek kopyalama",
            "+ overloaded",
            "Python hatası"
          ],
          "ans": 1,
          "exp": "s += x: mevcut string yok edilmez (immutable), yeni string oluşturulur. n string için n² karakter kopyalanır. join() önce listeyi toplar, bir kere ayırır: O(n)."
        }
      ],
      "fills": [
        {
          "code": "t = timeit.<input class=\"blank\" data-ans=\"timeit\" placeholder=\"?\" style=\"width:55px\">(<span class=\"fn\">fonk</span>, number=<span class=\"nm\">1000</span>)",
          "hint": "Benchmark fonksiyonu"
        },
        {
          "code": "profil = cProfile.<input class=\"blank\" data-ans=\"Profile\" placeholder=\"?\" style=\"width:65px\">()",
          "hint": "Profil nesnesi"
        },
        {
          "code": "profil.<input class=\"blank\" data-ans=\"enable\" placeholder=\"?\" style=\"width:55px\">(); ...; profil.<input class=\"blank\" data-ans=\"disable\" placeholder=\"?\" style=\"width:60px\">()",
          "hint": "Başlat/durdur"
        },
        {
          "code": "istat.<input class=\"blank\" data-ans=\"sort_stats\" placeholder=\"?\" style=\"width:85px\">(<span class=\"st\">\"cumulative\"</span>)",
          "hint": "İstatistik sıralama"
        },
        {
          "code": "kume = <input class=\"blank\" data-ans=\"set\" placeholder=\"?\" style=\"width:35px\">(liste)<span class=\"cm\">  # O(1) arama için</span>",
          "hint": "Hızlı arama yapısı"
        }
      ],
      "drag": [
        {
          "code": "t = timeit.<span class=\"hl\">___</span>(fonk, number=1000)",
          "ans": "timeit",
          "opts": [
            "timeit",
            "profile",
            "measure",
            "benchmark",
            "time"
          ],
          "exp": "timeit.timeit() kodu n kez çalıştırır, toplam süreyi döner"
        },
        {
          "code": "profil = cProfile.<span class=\"hl\">___</span>()",
          "ans": "Profile",
          "opts": [
            "Profile",
            "Profiler",
            "cProfile",
            "Stats",
            "Timer"
          ],
          "exp": "cProfile.Profile() profiler nesnesi oluşturur"
        },
        {
          "code": "istat.sort_stats(<span class=\"hl\">___</span>)",
          "ans": "\"cumulative\"",
          "opts": [
            "\"cumulative\"",
            "\"tottime\"",
            "\"ncalls\"",
            "\"name\"",
            "\"line\""
          ],
          "exp": "cumulative: alt çağrılar dahil toplam süre — darboğaz bulmak için ideal"
        },
        {
          "code": "x in <span class=\"hl\">___</span>  # O(1) arama",
          "ans": "kume",
          "opts": [
            "kume",
            "liste",
            "dict",
            "tuple",
            "array"
          ],
          "exp": "set ve dict hash tablosu: O(1) __contains__"
        },
        {
          "code": "<span class=\"hl\">___</span>.join(parcalar)  # O(n)",
          "ans": "\"\"",
          "opts": [
            "\"\"",
            "'_'",
            "','",
            "list",
            "join"
          ],
          "exp": "join() tüm parçaları tek seferde birleştirir — O(n)"
        }
      ],
      "code": {
        "task": "timeit ile 3 farklı yöntemi karşılaştır: 1) 1000 elemanlı liste oluşturma: for döngüsü vs list comprehension vs list(range()). Her birini 10000 kez çalıştır ve süreleri yazdır.",
        "starter": "import timeit\n\ndef for_dongusu():\n    lst = []\n    for i in range(1000):\n        lst.append(i)\n    return lst\n\ndef list_comp():\n    return [i for i in range(1000)]\n\ndef list_range():\n    return list(range(1000))\n\nn = 10000\nt1 = timeit.timeit(for_dongusu, number=n)\nt2 = timeit.timeit(list_comp, number=n)\nt3 = timeit.timeit(list_range, number=n)\n\nprint(f'for dongusu: {t1:.3f}s')\nprint(f'list comp:   {t2:.3f}s')\nprint(f'list(range): {t3:.3f}s')\nprint(f'En hizli: list(range) - {t1/t3:.1f}x hizlanma')",
        "checkFn": "(code)=>{const c=code;const p=(c.includes('timeit.timeit')?3:0)+(c.includes('number=')?2:0)+((c.match(/def /g)||[]).length>=2?2:0)+((c.match(/print/g)||[]).length>=3?3:0);return{pts:Math.min(p,10),max:10,ok:p>=6,msg:p>=8?'Profiling ustasi! ⚡':p>=6?'Güzel benchmark!':'timeit.timeit, number ve birden fazla fonksiyon karşılaştır.'};",
        "hint": "timeit.timeit(fonk, number=N) fonksiyonu N kez çalıştırır. number büyük tutunca daha güvenilir ölçüm."
      }
    }
  },
  {
    "id": "sqlite_db",
    "icon": "🗄️",
    "locked": true,
    "title": "SQLite & Veritabanı",
    "desc": "sqlite3, CRUD, parameterized query, transaction — kalıcı veri yönetimi.",
    "phases": {
      "lesson": "<div class=\"lesson-text\">\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--purple)\"></div><h3>SQLite & Veritabanı — Veriyi Kalıcı Yap</h3></div>\n    <p>JSON dosyasına yazdığın veriler arama yapamazsın, filtreleyemezsin, birden fazla tablo birleştiremezsin. Veritabanı bu sorunları çözer. <code>sqlite3</code> Python'a dahili gelir — kurulum yok, tek dosya, production'a bile uygun küçük uygulamalar için.</p>\n    <div class=\"box why\"><span class=\"box-icon\">🤔</span><span><strong>Neden SQLite?</strong> PostgreSQL/MySQL sunucu kurmayı gerektiriyor. SQLite: tek dosya, sıfır konfigürasyon, Python'a dahili. 10TB'a kadar ve saniyede yüzlerce yazma işlemini kaldırıyor. Mobil uygulamalar, tarayıcılar, gömülü sistemler SQLite kullanıyor. Öğrenmek için ideal başlangıç noktası.</span></div>\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--blue)\"></div><h3>Bağlantı, Tablo ve CRUD</h3></div>\n    <div class=\"code-block runnable\"><div class=\"cb-header\"><div class=\"cb-dots\"></div><span class=\"cb-label\">crud.py</span><span class=\"cb-run-tag\">▶</span></div><div class=\"cb-body\"><span class=\"kw\">import</span> sqlite3<br><br><span class=\"cm\"># Bağlantı aç (:memory: → RAM, dosya yolu → disk)</span><br><span class=\"kw\">with</span> sqlite3.<span class=\"fn\">connect</span>(<span class=\"st\">\"okul.db\"</span>) <span class=\"kw\">as</span> conn:<br>&nbsp;&nbsp;&nbsp;&nbsp;cur = conn.<span class=\"fn\">cursor</span>()<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"cm\"># Tablo oluştur</span><br>&nbsp;&nbsp;&nbsp;&nbsp;cur.<span class=\"fn\">execute</span>(\"\"\"<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CREATE TABLE IF NOT EXISTS ogrenciler (<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id INTEGER PRIMARY KEY AUTOINCREMENT,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ad TEXT NOT NULL,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;not_ort REAL DEFAULT 0<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)<br>&nbsp;&nbsp;&nbsp;&nbsp;\"\"\")<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"cm\"># Kayıt ekle (parameterized — SQL injection önler)</span><br>&nbsp;&nbsp;&nbsp;&nbsp;cur.<span class=\"fn\">execute</span>(<span class=\"st\">\"INSERT INTO ogrenciler(ad, not_ort) VALUES(?, ?)\"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(<span class=\"st\">\"Ali\"</span>, <span class=\"nm\">85.5</span>))<br>&nbsp;&nbsp;&nbsp;&nbsp;cur.<span class=\"fn\">executemany</span>(<span class=\"st\">\"INSERT INTO ogrenciler(ad, not_ort) VALUES(?, ?)\"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[(<span class=\"st\">\"Berk\"</span>,<span class=\"nm\">92</span>),(<span class=\"st\">\"Can\"</span>,<span class=\"nm\">78</span>)])<br>&nbsp;&nbsp;&nbsp;&nbsp;conn.<span class=\"fn\">commit</span>()</div><textarea class=\"cb-src\" style=\"display:none\">import sqlite3\nwith sqlite3.connect(\":memory:\") as conn:\n    cur = conn.cursor()\n    cur.execute(\"\"\"\n        CREATE TABLE IF NOT EXISTS ogrenciler (\n            id INTEGER PRIMARY KEY AUTOINCREMENT,\n            ad TEXT NOT NULL,\n            not_ort REAL DEFAULT 0\n        )\n    \"\"\")\n    cur.execute(\"INSERT INTO ogrenciler(ad, not_ort) VALUES(?, ?)\", (\"Ali\", 85.5))\n    cur.executemany(\"INSERT INTO ogrenciler(ad, not_ort) VALUES(?, ?)\",\n        [(\"Berk\", 92), (\"Can\", 78), (\"Deniz\", 95)])\n    conn.commit()\n    for satir in cur.execute(\"SELECT * FROM ogrenciler\"):\n        print(satir)</textarea></div>\n    <div class=\"box warn\"><span class=\"box-icon\">⚠️</span><span><strong>Parameterized query ZORUNLU!</strong> <code>f\"INSERT ... VALUES('{ad}')\"</code> yazmak SQL injection'a kapı açar. Kullanıcı girişi <code>'; DROP TABLE ogrenciler; --</code> içerebilir. Her zaman <code>?</code> placeholder ve tuple kullan.</span></div>\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--green)\"></div><h3>Sorgular — SELECT, WHERE, JOIN</h3></div>\n    <div class=\"code-block runnable\"><div class=\"cb-header\"><div class=\"cb-dots\"></div><span class=\"cb-label\">sorgu.py</span><span class=\"cb-run-tag\">▶</span></div><div class=\"cb-body\"><span class=\"kw\">with</span> sqlite3.<span class=\"fn\">connect</span>(<span class=\"st\">\"okul.db\"</span>) <span class=\"kw\">as</span> conn:<br>&nbsp;&nbsp;&nbsp;&nbsp;conn.<span class=\"fn\">row_factory</span> = sqlite3.<span class=\"fn\">Row</span><span class=\"cm\">  # dict gibi erişim</span><br>&nbsp;&nbsp;&nbsp;&nbsp;cur = conn.<span class=\"fn\">cursor</span>()<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"cm\"># WHERE ile filtre</span><br>&nbsp;&nbsp;&nbsp;&nbsp;cur.<span class=\"fn\">execute</span>(<span class=\"st\">\"SELECT * FROM ogrenciler WHERE not_ort > ?\"</span>, (<span class=\"nm\">80</span>,))<br>&nbsp;&nbsp;&nbsp;&nbsp;basarili = cur.<span class=\"fn\">fetchall</span>()<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">for</span> s <span class=\"kw\">in</span> basarili:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"fn\">print</span>(<span class=\"st\">f\"{s['ad']}: {s['not_ort']}\"</span>)<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"cm\"># Aggregate</span><br>&nbsp;&nbsp;&nbsp;&nbsp;cur.<span class=\"fn\">execute</span>(<span class=\"st\">\"SELECT AVG(not_ort), MAX(not_ort) FROM ogrenciler\"</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;ort, maks = cur.<span class=\"fn\">fetchone</span>()<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"fn\">print</span>(<span class=\"st\">f\"Ort: {ort:.1f}, Maks: {maks}\"</span>)</div><textarea class=\"cb-src\" style=\"display:none\">import sqlite3\nwith sqlite3.connect(\":memory:\") as conn:\n    conn.row_factory = sqlite3.Row\n    cur = conn.cursor()\n    cur.execute(\"CREATE TABLE ogrenciler (id INTEGER PRIMARY KEY AUTOINCREMENT, ad TEXT, not_ort REAL)\")\n    cur.executemany(\"INSERT INTO ogrenciler(ad, not_ort) VALUES(?, ?)\",\n        [(\"Ali\",85),(\"Berk\",92),(\"Can\",78),(\"Deniz\",95)])\n    cur.execute(\"SELECT * FROM ogrenciler WHERE not_ort > ?\", (80,))\n    for s in cur.fetchall():\n        print(f\"{s['ad']}: {s['not_ort']}\")\n    cur.execute(\"SELECT AVG(not_ort), MAX(not_ort) FROM ogrenciler\")\n    ort, maks = cur.fetchone()\n    print(f\"Ort: {ort:.1f}, Maks: {maks}\")</textarea></div>\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--amber)\"></div><h3>Transaction ve Hata Yönetimi</h3></div>\n    <div class=\"code-block runnable\"><div class=\"cb-header\"><div class=\"cb-dots\"></div><span class=\"cb-label\">transaction.py</span><span class=\"cb-run-tag\">▶</span></div><div class=\"cb-body\"><span class=\"kw\">import</span> sqlite3<br><br><span class=\"kw\">def</span> <span class=\"fn\">para_transfer</span>(conn, kaynak_id, hedef_id, miktar):<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">try</span>:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;conn.<span class=\"fn\">execute</span>(<span class=\"st\">\"UPDATE hesap SET bakiye = bakiye - ? WHERE id = ?\"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(miktar, kaynak_id))<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;conn.<span class=\"fn\">execute</span>(<span class=\"st\">\"UPDATE hesap SET bakiye = bakiye + ? WHERE id = ?\"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(miktar, hedef_id))<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;conn.<span class=\"fn\">commit</span>()<span class=\"cm\">  # her ikisi başarılıysa kaydet</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">except</span> <span class=\"fn\">Exception</span> <span class=\"kw\">as</span> e:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;conn.<span class=\"fn\">rollback</span>()<span class=\"cm\">  # hata varsa geri al</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">raise</span><br><br><span class=\"cm\"># with bağlamı auto-commit/rollback sağlar</span><br><span class=\"kw\">with</span> sqlite3.<span class=\"fn\">connect</span>(<span class=\"st\">\"banka.db\"</span>) <span class=\"kw\">as</span> conn:<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"fn\">para_transfer</span>(conn, <span class=\"nm\">1</span>, <span class=\"nm\">2</span>, <span class=\"nm\">500</span>)</div><textarea class=\"cb-src\" style=\"display:none\">import sqlite3\nwith sqlite3.connect(\":memory:\") as conn:\n    conn.execute(\"CREATE TABLE hesap (id INTEGER PRIMARY KEY, ad TEXT, bakiye REAL)\")\n    conn.execute(\"INSERT INTO hesap VALUES (1, 'Ali', 1000)\")\n    conn.execute(\"INSERT INTO hesap VALUES (2, 'Berk', 500)\")\n    conn.commit()\n    try:\n        conn.execute(\"UPDATE hesap SET bakiye = bakiye - 300 WHERE id = 1\")\n        conn.execute(\"UPDATE hesap SET bakiye = bakiye + 300 WHERE id = 2\")\n        conn.commit()\n        print(\"Transfer OK\")\n    except Exception as e:\n        conn.rollback()\n        print(\"Hata, geri alindi:\", e)\n    for row in conn.execute(\"SELECT * FROM hesap\"):\n        print(row)</textarea></div>\n    <div class=\"box deep\"><span class=\"box-icon\">🧠</span><span><strong>with conn: ne yapar?</strong> with sqlite3.connect() as conn kullanırken: blok başarıyla tamamlanırsa otomatik COMMIT, exception olursa otomatik ROLLBACK. conn.close() ise ayrıca çağırmak gerekmez — with bloğundan çıkınca bağlantı kapanır.</span></div>\n    <div class=\"box alt\"><span class=\"box-icon\">⚖️</span><span><strong>sqlite3 sonrası ne?</strong> Büyük uygulamalar için: PostgreSQL (güçlü, JSONB, full-text search). ORM katmanı için: SQLAlchemy (tüm DB'lerle uyumlu, Pythonic) veya Django ORM. Migration için: Alembic. SQLite öğrenmek SQL temelini verir — diğer DB'lere geçiş kolay.</span></div>\n    <div class=\"lesson-nav\"><button class=\"nav-btn go\" onclick=\"switchPhase(1)\">🧠 Teste Geç →</button></div>\n  </div>",
      "quiz": [
        {
          "q": "Parameterized query neden SQL injection'ı önler?",
          "opts": [
            "Daha hızlı",
            "? placeholder değeri string olarak değil parametre olarak iletir — SQL kodu enjekte edilemez",
            "Şifreleme",
            "Bağlantı şifreli"
          ],
          "ans": 1,
          "exp": "f-string ile query: kullanıcı girişi doğrudan SQL olur. ? ile: değer her zaman string olarak muamele görür, SQL kod parçası sayılmaz. 'Ali; DROP TABLE' → sadece bir isim olur."
        },
        {
          "q": "conn.commit() ne zaman çağrılmalı?",
          "opts": [
            "Her sorguda",
            "INSERT/UPDATE/DELETE sonrası değişiklikleri kalıcı yapmak için",
            "SELECT'ten önce",
            "Bağlantı açılınca"
          ],
          "ans": 1,
          "exp": "SQLite transaction tabanlı. commit() değişiklikleri diske yazar ve kalıcı yapar. commit() çağrılmadan bağlantı kapanırsa değişiklikler kaybolur. with conn: otomatik commit/rollback sağlar."
        },
        {
          "q": "conn.row_factory = sqlite3.Row ne sağlar?",
          "opts": [
            "Daha hızlı sorgu",
            "Tuple yerine sütun adıyla erişim: satir['ad'] gibi",
            "Otomatik join",
            "Primary key ekler"
          ],
          "ans": 1,
          "exp": "Varsayılan fetchall() tuple döner: satir[0], satir[1]. Row factory ile satir['ad'], satir['not_ort'] gibi isimle erişilir — daha okunabilir kod."
        },
        {
          "q": "Transaction neden önemli?",
          "opts": [
            "Hız için",
            "Ya hepsi ya hiçbiri — banka transferinde para çıkış OK ama giriş başarısız olursa rollback",
            "Şifreleme",
            "Yedekleme"
          ],
          "ans": 1,
          "exp": "Transaction ACID garantisi verir. Transfer: kaynak - 500 ve hedef + 500 ayrı iki UPDATE. İkincisi başarısız olursa rollback ile birincisi de geri alınır. Yarım işlem kalmaz."
        },
        {
          "q": ":memory: ne anlama gelir?",
          "opts": [
            "Bellek hatası",
            "RAM'de geçici veritabanı — program bitince kaybolur, test için ideal",
            "Özel dosya",
            "Cache modu"
          ],
          "ans": 1,
          "exp": ":memory: disk yerine RAM'de DB oluşturur. Test, prototip, geçici işlem için mükemmel. Program bitince her şey kaybolur. Dosya yolu verince (okul.db) kalıcı olur."
        }
      ],
      "fills": [
        {
          "code": "<span class=\"kw\">with</span> sqlite3.<input class=\"blank\" data-ans=\"connect\" placeholder=\"?\" style=\"width:60px\">(<span class=\"st\">\"okul.db\"</span>) <span class=\"kw\">as</span> conn:",
          "hint": "Bağlantı açma"
        },
        {
          "code": "&nbsp;&nbsp;&nbsp;&nbsp;cur = conn.<input class=\"blank\" data-ans=\"cursor\" placeholder=\"?\" style=\"width:58px\">()",
          "hint": "Cursor oluşturma"
        },
        {
          "code": "&nbsp;&nbsp;&nbsp;&nbsp;cur.<input class=\"blank\" data-ans=\"execute\" placeholder=\"?\" style=\"width:58px\">(<span class=\"st\">\"SELECT * FROM tablo\"</span>)",
          "hint": "Sorgu çalıştırma"
        },
        {
          "code": "&nbsp;&nbsp;&nbsp;&nbsp;satir = cur.<input class=\"blank\" data-ans=\"fetchone\" placeholder=\"?\" style=\"width:72px\">()<span class=\"cm\">  # tek kayıt</span>",
          "hint": "Tek kayıt alma"
        },
        {
          "code": "&nbsp;&nbsp;&nbsp;&nbsp;conn.<input class=\"blank\" data-ans=\"commit\" placeholder=\"?\" style=\"width:55px\">()<span class=\"cm\">  # kaydet</span>",
          "hint": "Değişiklikleri kalıcı yap"
        }
      ],
      "drag": [
        {
          "code": "with sqlite3.<span class=\"hl\">___</span>('okul.db') as conn:",
          "ans": "connect",
          "opts": [
            "connect",
            "open",
            "create",
            "init",
            "start"
          ],
          "exp": "sqlite3.connect() veritabanı bağlantısı açar veya dosyayı oluşturur"
        },
        {
          "code": "cur.execute('INSERT ... VALUES(?, ?)', <span class=\"hl\">___</span>)",
          "ans": "('Ali', 85)",
          "opts": [
            "('Ali', 85)",
            "['Ali', 85]",
            "{'ad':'Ali'}",
            "'Ali, 85'",
            "(Ali, 85)"
          ],
          "exp": "Parameterized query: ? yerine geçecek değerler tuple olarak verilir"
        },
        {
          "code": "conn.<span class=\"hl\">___</span> = sqlite3.Row  # dict erişim",
          "ans": "row_factory",
          "opts": [
            "row_factory",
            "row_type",
            "cursor_type",
            "fetch_mode",
            "result_mode"
          ],
          "exp": "row_factory = sqlite3.Row ile sütun adıyla erişim sağlanır"
        },
        {
          "code": "conn.<span class=\"hl\">___</span>()  # geri al",
          "ans": "rollback",
          "opts": [
            "rollback",
            "undo",
            "revert",
            "cancel",
            "restore"
          ],
          "exp": "rollback() commit edilmemiş tüm değişiklikleri geri alır"
        },
        {
          "code": "kayitlar = cur.<span class=\"hl\">___</span>()  # tümü",
          "ans": "fetchall",
          "opts": [
            "fetchall",
            "fetchone",
            "fetchmany",
            "getall",
            "selectall"
          ],
          "exp": "fetchall() tüm sonuç satırlarını liste olarak döner"
        }
      ],
      "code": {
        "task": "Kütüphane DB'si oluştur. kitaplar tablosu: id, baslik, yazar, yil, musait(1/0). 5 kitap ekle. Mevcut kitapları sorgula (musait=1). Bir kitabı ödünç ver (musait=0 güncelle). Ortalama yılı hesapla.",
        "starter": "import sqlite3\n\nwith sqlite3.connect(':memory:') as conn:\n    conn.row_factory = sqlite3.Row\n    cur = conn.cursor()\n    \n    cur.execute('''\n        CREATE TABLE kitaplar (\n            id INTEGER PRIMARY KEY AUTOINCREMENT,\n            baslik TEXT NOT NULL,\n            yazar TEXT,\n            yil INTEGER,\n            musait INTEGER DEFAULT 1\n        )\n    ''')\n    \n    kitaplar = [\n        ('Python', 'Guido', 2023, 1),\n        ('Clean Code', 'Martin', 2008, 1),\n        ('SICP', 'Abelson', 1996, 1),\n        ('Design Patterns', 'GoF', 1994, 1),\n        ('Pragmatic Programmer', 'Hunt', 2019, 1)\n    ]\n    cur.executemany('INSERT INTO kitaplar(baslik, yazar, yil, musait) VALUES(?,?,?,?)', kitaplar)\n    conn.commit()\n    \n    print('Musait kitaplar:')\n    for k in cur.execute('SELECT * FROM kitaplar WHERE musait = 1'):\n        print(f'  {k[\"baslik\"]} ({k[\"yil\"]})')\n    \n    cur.execute('UPDATE kitaplar SET musait = 0 WHERE id = 1')\n    conn.commit()\n    \n    cur.execute('SELECT AVG(yil) FROM kitaplar')\n    print(f'Ort yil: {cur.fetchone()[0]:.0f}')",
        "checkFn": "(code)=>{const c=code;const p=(c.includes('CREATE TABLE')?2:0)+(c.includes('executemany')||c.includes('execute')?2:0)+(c.includes('WHERE')?2:0)+(c.includes('UPDATE')?2:0)+(c.includes('AVG')||c.includes('fetchone')?2:0);return{pts:Math.min(p,10),max:10,ok:p>=6,msg:p>=8?'DB ustasi! 🗄️':p>=6?'Güzel SQL!':'CREATE TABLE, INSERT, SELECT WHERE, UPDATE yaz.'};",
        "hint": "executemany ile toplu insert. WHERE musait=1 ile filtre. UPDATE ... SET musait=0 ile güncelle."
      }
    }
  },
  {
    "id": "regex",
    "icon": "🔍",
    "locked": true,
    "title": "Regex",
    "desc": "re modülü, search/match/findall, gruplar, compile — metin desenleri ve dönüşümler.",
    "phases": {
      "lesson": "<div class=\"lesson-text\">\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--purple)\"></div><h3>Regex — Metin Desenleri Bul ve Dönüştür</h3></div>\n    <p>Regex (Regular Expression): metin içinde desen aramak için özel bir dil. Email doğrulaması, log parsing, veri temizleme, URL çıkarma — tüm metin işlemlerinde güçlü araç. Python'da <code>re</code> modülü ile kullanılır.</p>\n    <div class=\"box why\"><span class=\"box-icon\">🤔</span><span><strong>Neden regex?</strong> 'E-posta adresi içeriyor mu?' sorusu: str.find() yetersiz. 'user@domain.com' formatını kontrol etmek için: kullanıcı adı + @ + domain + . + uzantı. Her parçanın farklı kuralı var. Regex bunu tek bir pattern ile ifade eder. Web scraping, log analizi, veri temizlemede vazgeçilmez.</span></div>\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--blue)\"></div><h3>Temel Fonksiyonlar — search, match, findall</h3></div>\n    <div class=\"code-block runnable\"><div class=\"cb-header\"><div class=\"cb-dots\"></div><span class=\"cb-label\">regex_temel.py</span><span class=\"cb-run-tag\">▶</span></div><div class=\"cb-body\"><span class=\"kw\">import</span> re<br><br>metin = <span class=\"st\">\"Python 3.12 çıktı, 2024 yılında!\"</span><br><br><span class=\"cm\"># search — metin içinde ilk eşleşme</span><br>m = re.<span class=\"fn\">search</span>(<span class=\"st\">r\"\\d+\"</span>, metin)<br><span class=\"kw\">if</span> m:<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"fn\">print</span>(m.<span class=\"fn\">group</span>())&nbsp;<span class=\"cm\"># 3 — ilk sayı</span><br><br><span class=\"cm\"># findall — tüm eşleşmeleri liste</span><br>sayilar = re.<span class=\"fn\">findall</span>(<span class=\"st\">r\"\\d+\"</span>, metin)<br><span class=\"fn\">print</span>(sayilar)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"cm\"># ['3', '12', '2024']</span><br><br><span class=\"cm\"># match — sadece baştan eşleşme</span><br>m2 = re.<span class=\"fn\">match</span>(<span class=\"st\">r\"Python\"</span>, metin)<br><span class=\"fn\">print</span>(<span class=\"fn\">bool</span>(m2))&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"cm\"># True — başta Python var</span><br><br><span class=\"cm\"># sub — bul ve değiştir</span><br>temiz = re.<span class=\"fn\">sub</span>(<span class=\"st\">r\"\\d+\"</span>, <span class=\"st\">\"X\"</span>, metin)<br><span class=\"fn\">print</span>(temiz)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"cm\"># Python X.X çıktı, X yılında!</span></div><textarea class=\"cb-src\" style=\"display:none\">import re\nmetin = \"Python 3.12 cikti, 2024 yilinda!\"\nm = re.search(r\"\\d+\", metin)\nif m:\n    print(m.group())\nsayilar = re.findall(r\"\\d+\", metin)\nprint(sayilar)\nm2 = re.match(r\"Python\", metin)\nprint(bool(m2))\ntemiz = re.sub(r\"\\d+\", \"X\", metin)\nprint(temiz)</textarea></div>\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--green)\"></div><h3>Özel Karakterler ve Gruplar</h3></div>\n    <table class='cmp-table'><tr><th>Pattern</th><th>Anlamı</th><th>Örnek</th></tr><tr><td><code>\\d</code></td><td>Rakam [0-9]</td><td><code>\\d{4}</code> → 4 rakam</td></tr><tr><td><code>\\w</code></td><td>Harf/rakam/alt çizgi</td><td><code>\\w+</code> → kelime</td></tr><tr><td><code>\\s</code></td><td>Boşluk karakteri</td><td><code>\\s+</code> → boşluklar</td></tr><tr><td><code>.</code></td><td>Herhangi karakter</td><td><code>.+</code> → her şey</td></tr><tr><td><code>^</code></td><td>Satır başı</td><td><code>^Python</code></td></tr><tr><td><code>$</code></td><td>Satır sonu</td><td><code>py$</code></td></tr><tr><td><code>()</code></td><td>Grup</td><td><code>(\\d+)-(\\d+)</code></td></tr></table>\n    <div class=\"code-block runnable\"><div class=\"cb-header\"><div class=\"cb-dots\"></div><span class=\"cb-label\">gruplar.py</span><span class=\"cb-run-tag\">▶</span></div><div class=\"cb-body\"><span class=\"kw\">import</span> re<br><br><span class=\"cm\"># Gruplar ile email parse</span><br>email_pattern = <span class=\"st\">r\"(\\w+)@(\\w+)\\.(\\w+)\"</span><br>email = <span class=\"st\">\"kullanici@ornek.com\"</span><br>m = re.<span class=\"fn\">match</span>(email_pattern, email)<br><span class=\"kw\">if</span> m:<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"fn\">print</span>(m.<span class=\"fn\">group</span>(<span class=\"nm\">1</span>))&nbsp;<span class=\"cm\"># kullanici</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"fn\">print</span>(m.<span class=\"fn\">group</span>(<span class=\"nm\">2</span>))&nbsp;<span class=\"cm\"># ornek</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"fn\">print</span>(m.<span class=\"fn\">group</span>(<span class=\"nm\">3</span>))&nbsp;<span class=\"cm\"># com</span><br><br><span class=\"cm\"># İsimli gruplar</span><br>tarih_p = <span class=\"st\">r\"(?P<yil>\\d{4})-(?P<ay>\\d{2})-(?P<gun>\\d{2})\"</span><br>m2 = re.<span class=\"fn\">search</span>(tarih_p, <span class=\"st\">\"Tarih: 2024-01-15\"</span>)<br><span class=\"fn\">print</span>(m2.<span class=\"fn\">group</span>(<span class=\"st\">\"yil\"</span>), m2.<span class=\"fn\">group</span>(<span class=\"st\">\"gun\"</span>))</div><textarea class=\"cb-src\" style=\"display:none\">import re\nemail_pattern = r\"(\\w+)@(\\w+)\\.(\\w+)\"\nemail = \"kullanici@ornek.com\"\nm = re.match(email_pattern, email)\nif m:\n    print(m.group(1))\n    print(m.group(2))\n    print(m.group(3))\ntarih_p = r\"(?P<yil>\\d{4})-(?P<ay>\\d{2})-(?P<gun>\\d{2})\"\nm2 = re.search(tarih_p, \"Tarih: 2024-01-15\")\nif m2:\n    print(m2.group(\"yil\"), m2.group(\"gun\"))</textarea></div>\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--amber)\"></div><h3>re.compile ve Flags</h3></div>\n    <div class=\"code-block runnable\"><div class=\"cb-header\"><div class=\"cb-dots\"></div><span class=\"cb-label\">compile_flags.py</span><span class=\"cb-run-tag\">▶</span></div><div class=\"cb-body\"><span class=\"kw\">import</span> re<br><br><span class=\"cm\"># Tekrar kullanılacak pattern → compile et</span><br>email_re = re.<span class=\"fn\">compile</span>(<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"st\">r\"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}\"</span><br>)<br><br>metinler = [<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"st\">\"ali@ornek.com\"</span>, <span class=\"st\">\"berk@test.org\"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"st\">\"gecersiz-email\"</span>, <span class=\"st\">\"can@site.io\"</span><br>]<br><span class=\"kw\">for</span> t <span class=\"kw\">in</span> metinler:<br>&nbsp;&nbsp;&nbsp;&nbsp;gecerli = <span class=\"fn\">bool</span>(email_re.<span class=\"fn\">fullmatch</span>(t))<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"fn\">print</span>(<span class=\"st\">f\"{t}: {gecerli}\"</span>)<br><br><span class=\"cm\"># re.IGNORECASE — büyük/küçük harf duyarsız</span><br>m = re.<span class=\"fn\">search</span>(<span class=\"st\">r\"python\"</span>, <span class=\"st\">\"PYTHON harika\"</span>, re.<span class=\"fn\">IGNORECASE</span>)<br><span class=\"fn\">print</span>(<span class=\"fn\">bool</span>(m))&nbsp;<span class=\"cm\"># True</span></div><textarea class=\"cb-src\" style=\"display:none\">import re\nemail_re = re.compile(r\"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}\")\nmetinler = [\"ali@ornek.com\", \"berk@test.org\", \"gecersiz\", \"can@site.io\"]\nfor t in metinler:\n    gecerli = bool(email_re.fullmatch(t))\n    print(f\"{t}: {gecerli}\")\nm = re.search(r\"python\", \"PYTHON harika\", re.IGNORECASE)\nprint(bool(m))</textarea></div>\n    <div class=\"box tip\"><span class=\"box-icon\">💡</span><span><strong>r'' (raw string) neden?</strong> <code>\\d</code> Python string'de backslash+d olarak yazılır. Normal string'de <code>\\\\d</code> yazmak gerekir. <code>r\"\\d\"</code> backslash'ı escape etmez — regex için daha temiz.</span></div>\n    <div class=\"box warn\"><span class=\"box-icon\">⚠️</span><span><strong>Regex her zaman doğru araç değil!</strong> Basit substring için str.find(), str.replace() yeterli. Email doğrulaması için eksiksiz regex imkânsız derecede karmaşık — kütüphane kullan. HTML parse etmek için regex yanlış araç, BeautifulSoup kullan.</span></div>\n    <div class=\"lesson-nav\"><button class=\"nav-btn go\" onclick=\"switchPhase(1)\">🧠 Teste Geç →</button></div>\n  </div>",
      "quiz": [
        {
          "q": "re.search() ile re.match() farkı nedir?",
          "opts": [
            "Aynı şey",
            "match sadece string başından kontrol eder, search herhangi yerden bulur",
            "match daha hızlı",
            "search grup desteklemez"
          ],
          "ans": 1,
          "exp": "match: string'in başından başlar — başta eşleşme yoksa None döner. search: string'in herhangi bir yerinde arar. Genellikle search daha kullanışlı."
        },
        {
          "q": "re.findall() ne döner?",
          "opts": [
            "Match nesnesi",
            "Tüm eşleşmelerin string listesi",
            "Sadece ilk eşleşme",
            "Boolean"
          ],
          "ans": 1,
          "exp": "findall(): string içindeki tüm eşleşmeleri liste olarak döner. Grup varsa tuple listesi döner. Eşleşme yoksa boş liste."
        },
        {
          "q": "r'' (raw string) regex'te neden kullanılır?",
          "opts": [
            "Daha hızlı",
            "Backslash escape gerekmez — \\d regex için düzgün çalışır",
            "Zorunlu",
            "Unicode için"
          ],
          "ans": 1,
          "exp": "Normal string '\\d' → backslash+d. r'\\d' raw string → gerçek backslash+d. Regex özel karakter \\d \\w \\s için raw string yazımı daha temiz ve hatasız."
        },
        {
          "q": "m.group(1) ne döner?",
          "opts": [
            "Tüm eşleşme",
            "Pattern'deki ilk () grubunun eşleşmesi",
            "İkinci eşleşme",
            "Karakter sayısı"
          ],
          "ans": 1,
          "exp": "group(0) veya group(): tüm eşleşme. group(1): ilk parantez grubunun içeriği. group('isim'): ?P<isim> ile tanımlı isimli grup."
        },
        {
          "q": "re.compile() ne zaman kullanılır?",
          "opts": [
            "Her zaman",
            "Aynı pattern birden fazla kullanılacaksa — compiled pattern daha hızlı",
            "Zorunlu",
            "Grup için"
          ],
          "ans": 1,
          "exp": "compile(): pattern'i bir kez derler, birden fazla kullanımda hız kazanır. Çok sayıda string üzerinde aynı pattern çalıştırılacaksa belirgin performans farkı yapar."
        }
      ],
      "fills": [
        {
          "code": "m = re.<input class=\"blank\" data-ans=\"search\" placeholder=\"?\" style=\"width:55px\">(<span class=\"st\">r\"\\\\d+\"</span>, metin)",
          "hint": "Metin içinde arama"
        },
        {
          "code": "sayilar = re.<input class=\"blank\" data-ans=\"findall\" placeholder=\"?\" style=\"width:65px\">(<span class=\"st\">r\"\\\\d+\"</span>, metin)",
          "hint": "Tüm eşleşmeler"
        },
        {
          "code": "temiz = re.<input class=\"blank\" data-ans=\"sub\" placeholder=\"?\" style=\"width:40px\">(<span class=\"st\">r\"\\\\s+\"</span>, <span class=\"st\">\" \"</span>, metin)",
          "hint": "Bul ve değiştir"
        },
        {
          "code": "p = re.<input class=\"blank\" data-ans=\"compile\" placeholder=\"?\" style=\"width:60px\">(<span class=\"st\">r\"\\\\w+\"</span>)<span class=\"cm\">  # derle</span>",
          "hint": "Pattern derleme"
        },
        {
          "code": "<span class=\"fn\">print</span>(m.<input class=\"blank\" data-ans=\"group\" placeholder=\"?\" style=\"width:48px\">(<span class=\"nm\">1</span>))<span class=\"cm\">  # ilk grup</span>",
          "hint": "Grup içeriği alma"
        }
      ],
      "drag": [
        {
          "code": "m = re.<span class=\"hl\">___</span>(r'\\d+', metin)  # ilk eşleşme",
          "ans": "search",
          "opts": [
            "search",
            "match",
            "find",
            "findall",
            "compile"
          ],
          "exp": "search() string içinde ilk eşleşmeyi bulur"
        },
        {
          "code": "liste = re.<span class=\"hl\">___</span>(r'\\d+', metin)  # hepsi",
          "ans": "findall",
          "opts": [
            "findall",
            "search",
            "match",
            "finditer",
            "compile"
          ],
          "exp": "findall() tüm eşleşmeleri string listesi olarak döner"
        },
        {
          "code": "yeni = re.<span class=\"hl\">___</span>(r'\\d+', 'X', metin)  # değiştir",
          "ans": "sub",
          "opts": [
            "sub",
            "replace",
            "swap",
            "change",
            "repl"
          ],
          "exp": "sub() eşleşen deseni verilen string ile değiştirir"
        },
        {
          "code": "re.search(r'python', metin, re.<span class=\"hl\">___</span>)",
          "ans": "IGNORECASE",
          "opts": [
            "IGNORECASE",
            "MULTILINE",
            "DOTALL",
            "VERBOSE",
            "GLOBAL"
          ],
          "exp": "IGNORECASE büyük/küçük harf duyarsız arama yapar"
        },
        {
          "code": "m = re.search(r'(?P<<span class=\"hl\">___</span>>\\d{4})', t)",
          "ans": "yil",
          "opts": [
            "yil",
            "name",
            "group",
            "label",
            "key"
          ],
          "exp": "?P<isim> ile isimli grup — m.group('yil') ile erişilir"
        }
      ],
      "code": {
        "task": "Log satırlarından bilgi çıkar. Format: '2024-01-15 ERROR kullanici: Ali mesaj: Giris hatasi'. findall ile tüm tarihleri bul. search ile ERROR/WARNING/INFO seviyesini bul. İsimli gruplarla kullanici ve mesaji parse et.",
        "starter": "import re\n\nlog = '2024-01-15 ERROR kullanici: Ali mesaj: Giris hatasi'\n\n# Tarihleri bul\ntarih_p = r'\\d{4}-\\d{2}-\\d{2}'\ntarihler = re.findall(tarih_p, log)\nprint('Tarihler:', tarihler)\n\n# Seviyeyi bul\nseviye_m = re.search(r'(ERROR|WARNING|INFO)', log)\nif seviye_m:\n    print('Seviye:', seviye_m.group(1))\n\n# Kullanici ve mesaji parse et\nparse_p = r'kullanici: (?P<kullanici>\\w+) mesaj: (?P<mesaj>.+)'\nm = re.search(parse_p, log)\nif m:\n    print('Kullanici:', m.group('kullanici'))\n    print('Mesaj:', m.group('mesaj'))",
        "checkFn": "(code)=>{const c=code;const p=(c.includes('re.findall')?2:0)+(c.includes('re.search')?2:0)+(c.includes('(?P<')?2:0)+(c.includes('.group(')?2:0)+((c.match(/print/g)||[]).length>=2?2:0);return{pts:Math.min(p,10),max:10,ok:p>=6,msg:p>=8?'Regex ustasi! 🔍':p>=6?'Güzel regex!':'findall, search, isimli grup ve group() kullan.'};",
        "hint": "r'\\d{4}-\\d{2}-\\d{2}' tarih deseni. (?P<isim>...) isimli grup. m.group('isim') ile eriş."
      }
    }
  },
  {
    "id": "web_scraping",
    "icon": "🌐",
    "locked": true,
    "title": "Web Scraping",
    "desc": "urllib, regex ile HTML parse, rate limiting, etik scraping kuralları.",
    "phases": {
      "lesson": "<div class=\"lesson-text\">\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--purple)\"></div><h3>Web Scraping — İnternetten Veri Topla</h3></div>\n    <p>Bir web sitesinden fiyatları takip etmek, haber başlıklarını toplamak, akademik veri derlemek istiyorsun ama API yok. Web scraping: HTML sayfasını indir, parse et, istediğin veriyi çıkar. Python'da <code>requests</code> + basit string/regex yeterli — bu derste builtin araçlarla öğreniyoruz.</p>\n    <div class=\"box why\"><span class=\"box-icon\">🤔</span><span><strong>Neden web scraping öğrenmeliyim?</strong> Veri bilimi, otomasyon, araştırma, fiyat takibi, iş analizi — web'deki açık veriyi kullanmak için scraping şart. API'si olan siteler için API kullan (daha stabil). API yoksa scraping. Etik kullan: robots.txt'e uy, rate limit koy, ToS'a dikkat et.</span></div>\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--blue)\"></div><h3>Requests ile HTML İndirme</h3></div>\n    <div class=\"code-block runnable\"><div class=\"cb-header\"><div class=\"cb-dots\"></div><span class=\"cb-label\">scraping_temel.py</span><span class=\"cb-run-tag\">▶</span></div><div class=\"cb-body\"><span class=\"kw\">import</span> urllib.request<br><span class=\"kw\">import</span> re<br><br><span class=\"cm\"># Skulpt uyumlu: urllib.request kullan</span><br><span class=\"kw\">def</span> <span class=\"fn\">html_getir</span>(url):<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">try</span>:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;req = urllib.request.<span class=\"fn\">Request</span>(url,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;headers={<span class=\"st\">\"User-Agent\"</span>: <span class=\"st\">\"Python/3\"</span>})<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">with</span> urllib.request.<span class=\"fn\">urlopen</span>(req) <span class=\"kw\">as</span> r:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">return</span> r.<span class=\"fn\">read</span>().<span class=\"fn\">decode</span>(<span class=\"st\">\"utf-8\"</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">except</span> <span class=\"fn\">Exception</span> <span class=\"kw\">as</span> e:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">return</span> <span class=\"st\">f\"Hata: {e}\"</span><br><br><span class=\"cm\"># HTML parse (regex ile basit)</span><br><span class=\"kw\">def</span> <span class=\"fn\">basliklari_bul</span>(html):<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">return</span> re.<span class=\"fn\">findall</span>(<span class=\"st\">r\"<h[1-6][^>]*>(.*?)</h[1-6]>\"</span>, html, re.<span class=\"fn\">DOTALL</span>)<br><br><span class=\"cm\"># Kullanım örneği (gerçek istek)</span><br>html = <span class=\"st\">\"<h1>Ana Başlık</h1><p>Metin</p><h2>Alt Başlık</h2>\"</span><br>basliklar = <span class=\"fn\">basliklari_bul</span>(html)<br><span class=\"fn\">print</span>(basliklar)</div><textarea class=\"cb-src\" style=\"display:none\">import re\n\n# HTML parse (regex ile)\ndef basliklari_bul(html):\n    return re.findall(r\"<h[1-6][^>]*>(.*?)</h[1-6]>\", html, re.DOTALL)\n\ndef linkleri_bul(html):\n    return re.findall(r'href=\"([^\"]+)\"', html)\n\nhtml = \"\"\"<html>\n<h1>Ana Baslik</h1>\n<p>Metin <a href=\"https://example.com\">link</a></p>\n<h2>Alt Baslik</h2>\n<a href=\"https://test.com\">link2</a>\n</html>\"\"\"\n\nbasliklar = basliklari_bul(html)\nprint(\"Basliklar:\", basliklar)\nlinks = linkleri_bul(html)\nprint(\"Linkler:\", links)</textarea></div>\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--green)\"></div><h3>HTML Parse — Regex ile Veri Çıkarma</h3></div>\n    <div class=\"code-block runnable\"><div class=\"cb-header\"><div class=\"cb-dots\"></div><span class=\"cb-label\">html_parse.py</span><span class=\"cb-run-tag\">▶</span></div><div class=\"cb-body\"><span class=\"kw\">import</span> re<br><br>html = <span class=\"st\">\"\"\"</span><br>&lt;div class='urun'&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;h3&gt;Laptop X200&lt;/h3&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;span class='fiyat'&gt;24.999 TL&lt;/span&gt;<br>&lt;/div&gt;<br>&lt;div class='urun'&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;h3&gt;Mouse Pro&lt;/h3&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;span class='fiyat'&gt;349 TL&lt;/span&gt;<br>&lt;/div&gt;<br><span class=\"st\">\"\"\"</span><br><br>urun_adi = re.<span class=\"fn\">findall</span>(<span class=\"st\">r\"<h3>(.*?)</h3>\"</span>, html)<br>fiyatlar = re.<span class=\"fn\">findall</span>(r\"class='fiyat'>(.*?)</span>\", html)<br><br>urunler = <span class=\"fn\">zip</span>(urun_adi, fiyatlar)<br><span class=\"kw\">for</span> ad, fiyat <span class=\"kw\">in</span> urunler:<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"fn\">print</span>(<span class=\"st\">f\"{ad}: {fiyat}\"</span>)</div><textarea class=\"cb-src\" style=\"display:none\">import re\n\nhtml = \"\"\"\n<div class='urun'>\n  <h3>Laptop X200</h3>\n  <span class='fiyat'>24.999 TL</span>\n</div>\n<div class='urun'>\n  <h3>Mouse Pro</h3>\n  <span class='fiyat'>349 TL</span>\n</div>\n\"\"\"\n\nurun_adi = re.findall(r'<h3>(.*?)</h3>', html)\nfiyatlar = re.findall(r\"class='fiyat'>(.*?)</span>\", html)\n\nfor ad, fiyat in zip(urun_adi, fiyatlar):\n    print(f'{ad}: {fiyat}')</textarea></div>\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--amber)\"></div><h3>Etik ve Pratik Kurallar</h3></div>\n    <table class='cmp-table'><tr><th>Kural</th><th>Neden?</th></tr><tr><td>robots.txt kontrol et</td><td>Sitenin izin verdiği yollar</td></tr><tr><td>Rate limiting — her istek arası bekle</td><td>Sunucuyu yormamak</td></tr><tr><td>User-Agent gönder</td><td>Kim olduğunu belirt</td></tr><tr><td>ToS oku</td><td>Bazı siteler scraping yasaklıyor</td></tr><tr><td>Kişisel veri toplama</td><td>KVKK/GDPR uyumunu kontrol et</td></tr></table>\n    <div class=\"code-block runnable\"><div class=\"cb-header\"><div class=\"cb-dots\"></div><span class=\"cb-label\">etik_scraping.py</span><span class=\"cb-run-tag\">▶</span></div><div class=\"cb-body\"><span class=\"kw\">import</span> re, time<br><br><span class=\"kw\">def</span> <span class=\"fn\">guvenli_cek</span>(sayfa_html, gecikme=<span class=\"nm\">1</span>):<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"cm\"># Rate limit</span><br>&nbsp;&nbsp;&nbsp;&nbsp;time.<span class=\"fn\">sleep</span>(gecikme)<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"cm\"># Veri çıkar</span><br>&nbsp;&nbsp;&nbsp;&nbsp;basliklar = re.<span class=\"fn\">findall</span>(<span class=\"st\">r\"<title>(.*?)</title>\"</span>, sayfa_html)<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">return</span> basliklar<br><br><span class=\"cm\"># Simüle edilmiş scraping</span><br>sayfa = <span class=\"st\">\"<html><title>Python Haberleri</title><p>İçerik</p></html>\"</span><br>basliklar = <span class=\"fn\">guvenli_cek</span>(sayfa, gecikme=<span class=\"nm\">0</span>)<br><span class=\"fn\">print</span>(basliklar)</div><textarea class=\"cb-src\" style=\"display:none\">import re\n\n# HTML'den veri cikarmak icin ornekler\nhtml = \"\"\"<html>\n<title>Python Haberleri</title>\n<meta name=\"description\" content=\"En son Python haberleri\">\n<body>\n<article><h2>Python 3.13 cikti</h2><p>...</p></article>\n<article><h2>NumPy 2.0 yeni ozellikler</h2><p>...</p></article>\n</body></html>\"\"\"\n\n# Title\ntitle = re.search(r\"<title>(.*?)</title>\", html)\nprint(\"Baslik:\", title.group(1) if title else \"Bulunamadi\")\n\n# Meta description\nmeta = re.search(r'content=\"([^\"]+)\"', html)\nprint(\"Aciklama:\", meta.group(1) if meta else \"-\")\n\n# Makaleler\nmakaleler = re.findall(r\"<h2>(.*?)</h2>\", html)\nprint(\"Makaleler:\", makaleler)</textarea></div>\n    <div class=\"box warn\"><span class=\"box-icon\">⚠️</span><span><strong>Regex ile HTML parse etme sınırı:</strong> Regex ile basit, düzenli HTML parse edilebilir. Ama iç içe etiketler, CDATA, encoding sorunları ile regex başarısız olur. Gerçek projede <code>BeautifulSoup</code> (pip install beautifulsoup4) kullan — HTML tree'yi doğru parse eder.</span></div>\n    <div class=\"box deep\"><span class=\"box-icon\">🧠</span><span><strong>JavaScript ile yüklenen içerik:</strong> Bazı siteler veriyi JS ile yükler — requests/urllib sadece HTML alır, JS çalıştırmaz. Bu durumda Selenium veya Playwright gerekir — gerçek browser başlatır, JS çalışır, sonra scrape edilir. Çok daha yavaş ve karmaşık.</span></div>\n    <div class=\"lesson-nav\"><button class=\"nav-btn go\" onclick=\"switchPhase(1)\">🧠 Teste Geç →</button></div>\n  </div>",
      "quiz": [
        {
          "q": "Web scraping yerine API ne zaman tercih edilmeli?",
          "opts": [
            "API her zaman daha iyi",
            "Sitenin API'si varsa — daha stabil, yasal, belgelenmiş, veri yapılandırılmış",
            "Scraping daha hızlı",
            "API yavaş"
          ],
          "ans": 1,
          "exp": "API: resmi, yapılandırılmış veri, ToS açık, güncelleme haberi gelir. Scraping: site tasarımı değişince bozulur, fragile. API varsa tercih et, yoksa scrape et."
        },
        {
          "q": "Rate limiting neden yapılır?",
          "opts": [
            "Daha fazla veri",
            "Sunucuyu aşırı yüklememek ve ban yememek",
            "Daha hızlı",
            "Zorunlu"
          ],
          "ans": 1,
          "exp": "Çok hızlı istek: sunucu yük altında kalır, IP ban yenebilir, site zarar görebilir. Her istek arası bekle (time.sleep). Gerçek projede 1-3 saniye arası yaygın."
        },
        {
          "q": "robots.txt ne içerir?",
          "opts": [
            "Site şifresi",
            "Sitenin scraper'lara izin verdiği ve vermediği URL'ler",
            "Kullanıcı listesi",
            "SSL sertifikası"
          ],
          "ans": 1,
          "exp": "robots.txt: örümcek robotlarına (Googlebot, scrapers) hangi yolların yasak olduğunu söyler. Disallow: /private/ yazan yol yasal olarak da erişilmemelidir."
        },
        {
          "q": "Regex ile HTML parse etmenin sınırı nedir?",
          "opts": [
            "Regex HTML parse edemez",
            "İç içe etiketler ve karmaşık HTML için güvenilmez — BeautifulSoup tercih edilmeli",
            "Çok yavaş",
            "Encoding sorunu yok"
          ],
          "ans": 1,
          "exp": "HTML context-free grammar — regex regular grammar. İç içe taglar, attribute'larda > işareti, CDATA, opsiyonel kapanış tagleri regex'i kırar. Basit, sabit formatlı HTML için OK."
        },
        {
          "q": "JavaScript ile yüklenen içerik için ne gerekir?",
          "opts": [
            "Daha iyi regex",
            "Selenium/Playwright — gerçek browser başlatır, JS çalıştırır",
            "requests yeterli",
            "urllib ile çözülür"
          ],
          "ans": 1,
          "exp": "requests/urllib sadece sunucunun gönderdiği HTML'i alır. SPA'lar (React, Vue) sayfayı JS ile render eder. Selenium veya Playwright browser başlatır, JS çalışır, sonra DOM scrape edilebilir."
        }
      ],
      "fills": [
        {
          "code": "<span class=\"kw\">import</span> urllib.<input class=\"blank\" data-ans=\"request\" placeholder=\"?\" style=\"width:70px\">",
          "hint": "HTTP istek modülü"
        },
        {
          "code": "basliklar = re.<input class=\"blank\" data-ans=\"findall\" placeholder=\"?\" style=\"width:65px\">(<span class=\"st\">r\"<h1>(.*?)</h1>\"</span>, html)",
          "hint": "Tüm eşleşmeler"
        },
        {
          "code": "<span class=\"kw\">import</span> <input class=\"blank\" data-ans=\"time\" placeholder=\"?\" style=\"width:42px\"><br>time.<input class=\"blank\" data-ans=\"sleep\" placeholder=\"?\" style=\"width:48px\">(<span class=\"nm\">1</span>)<span class=\"cm\">  # rate limit</span>",
          "hint": "Gecikme için modül ve fonksiyon"
        },
        {
          "code": "req = urllib.request.<input class=\"blank\" data-ans=\"Request\" placeholder=\"?\" style=\"width:65px\">(url, headers={...})",
          "hint": "İstek nesnesi"
        },
        {
          "code": "html = r.<input class=\"blank\" data-ans=\"read\" placeholder=\"?\" style=\"width:42px\">().<input class=\"blank\" data-ans=\"decode\" placeholder=\"?\" style=\"width:55px\">(<span class=\"st\">\"utf-8\"</span>)",
          "hint": "Byte → string dönüşümü"
        }
      ],
      "drag": [
        {
          "code": "re.findall(r'<h2><span class=\"hl\">___</span></h2>', html)",
          "ans": "(.*?)",
          "opts": [
            "(.*?)",
            "(.+)",
            "([^<]+)",
            "(.*)",
            "\\w+"
          ],
          "exp": "(.*?) non-greedy: en kısa eşleşme — iç içe taglar için gerekli"
        },
        {
          "code": "re.findall(r'href=<span class=\"hl\">___</span>')",
          "ans": "\"([^\"]+)\"",
          "opts": [
            "\"([^\"]+)\"",
            "\".*\"",
            "\"\\w+\"",
            "\"(.+)\"",
            "href"
          ],
          "exp": "href değerini çıkar — tırnak içi, tırnak hariç"
        },
        {
          "code": "import <span class=\"hl\">___</span>; <span class=\"hl\">___</span>.sleep(1)",
          "ans": "time",
          "opts": [
            "time",
            "sleep",
            "delay",
            "wait",
            "pause"
          ],
          "exp": "time.sleep() ile rate limiting — saniye cinsinden bekle"
        },
        {
          "code": "re.findall(r'pat', html, re.<span class=\"hl\">___</span>)",
          "ans": "DOTALL",
          "opts": [
            "DOTALL",
            "IGNORECASE",
            "MULTILINE",
            "VERBOSE",
            "UNICODE"
          ],
          "exp": "DOTALL: . karakteri newline'ı da eşleştirir — çok satırlı taglar için"
        },
        {
          "code": "for ad, fiyat in <span class=\"hl\">___</span>(adlar, fiyatlar):",
          "ans": "zip",
          "opts": [
            "zip",
            "map",
            "filter",
            "enumerate",
            "chain"
          ],
          "exp": "zip() iki listeyi paralel iterasyonla birleştirir"
        }
      ],
      "code": {
        "task": "HTML string'den veri çıkar. Ürün listesi HTML'i verildi. Regex ile: tüm ürün adlarını (<h3> içindekiler), tüm fiyatları (class='fiyat' içindekiler) ve tüm linkleri (href değerleri) bul. Her birini yazdır.",
        "starter": "import re\n\nhtml = \"\"\"\n<div class='katalog'>\n    <div class='urun'>\n        <h3>Laptop Pro X</h3>\n        <span class='fiyat'>45.999 TL</span>\n        <a href='/urun/laptop-pro'>Detay</a>\n    </div>\n    <div class='urun'>\n        <h3>Wireless Mouse</h3>\n        <span class='fiyat'>299 TL</span>\n        <a href='/urun/mouse'>Detay</a>\n    </div>\n    <div class='urun'>\n        <h3>Mekanik Klavye</h3>\n        <span class='fiyat'>1.299 TL</span>\n        <a href='/urun/klavye'>Detay</a>\n    </div>\n</div>\n\"\"\"\n\nAdlar = re.findall(r'<h3>(.*?)</h3>', html)\nfiyatlar = re.findall(r\"class='fiyat'>(.*?)</span>\", html)\nlinkler = re.findall(r\"href='([^']+)'\", html)\n\nprint('Urunler:', adlar)\nprint('Fiyatlar:', fiyatlar)\nprint('Linkler:', linkler)",
        "checkFn": "(code)=>{const c=code;const p=(c.includes('re.findall')?3:0)+(c.includes('<h3>')||c.includes('h3')?2:0)+(c.includes('fiyat')?2:0)+(c.includes('href')?1:0)+((c.match(/print/g)||[]).length>=3?2:0);return{pts:Math.min(p,10),max:10,ok:p>=6,msg:p>=8?'Scraping ustasi! 🌐':p>=6?'Güzel parse!':'re.findall ile h3, fiyat, href çıkar.'};",
        "hint": "r'<h3>(.*?)</h3>' ürün adı. r\"class='fiyat'>(.*?)</span>\" fiyat. r\"href='([^']+)'\" link."
      }
    }
  },
  {
    "id": "rest_api",
    "icon": "🌐",
    "locked": true,
    "title": "REST API Kullanımı",
    "desc": "HTTP metodları, JSON, API istekleri, hata yönetimi, rate limiting.",
    "phases": {
      "lesson": "<div class=\"lesson-text\">\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--purple)\"></div><h3>REST API — Web Servisleriyle Konuş</h3></div>\n    <p>Hava durumu uygulaması, döviz kuru takibi, GitHub repo analizi — bunların hepsi API'ye istek atıyor. <strong>REST API</strong>: HTTP protokolü üzerinden JSON veri alışverişi. Python'da <code>urllib</code> ile API istek atabilirsin — dışarıda <code>requests</code> kütüphanesi çok yaygın.</p>\n    <div class=\"box why\"><span class=\"box-icon\">🤔</span><span><strong>Neden API?</strong> Kendi başına hava durumu verisi üretemezsin — ama OpenWeatherMap API'sine istek atarsan saniyeler içinde dünyanın her yerinin hava durumunu alırsın. GitHub, Twitter, Spotify, Google Maps — binlerce API var. Modern yazılımın can damarı. REST öğrenmek bu ekosisteme kapı açar.</span></div>\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--blue)\"></div><h3>HTTP Metodları ve JSON</h3></div>\n    <table class='cmp-table'><tr><th>Metod</th><th>İşlem</th><th>Örnek</th></tr><tr><td><code>GET</code></td><td>Veri getir</td><td>GET /users/42</td></tr><tr><td><code>POST</code></td><td>Yeni kayıt oluştur</td><td>POST /users</td></tr><tr><td><code>PUT</code></td><td>Güncelle (tüm)</td><td>PUT /users/42</td></tr><tr><td><code>PATCH</code></td><td>Güncelle (kısmi)</td><td>PATCH /users/42</td></tr><tr><td><code>DELETE</code></td><td>Sil</td><td>DELETE /users/42</td></tr></table>\n    <div class=\"code-block runnable\"><div class=\"cb-header\"><div class=\"cb-dots\"></div><span class=\"cb-label\">json_islem.py</span><span class=\"cb-run-tag\">▶</span></div><div class=\"cb-body\"><span class=\"kw\">import</span> json<br><br><span class=\"cm\"># JSON ile çalışma — API'lerin dili</span><br>kullanici = {<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"st\">\"id\"</span>: <span class=\"nm\">1</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"st\">\"ad\"</span>: <span class=\"st\">\"Ali Kaya\"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"st\">\"email\"</span>: <span class=\"st\">\"ali@ornek.com\"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"st\">\"aktif\"</span>: <span class=\"kw\">True</span><br>}<br><br><span class=\"cm\"># dict → JSON string (serialization)</span><br>json_str = json.<span class=\"fn\">dumps</span>(kullanici, ensure_ascii=<span class=\"kw\">False</span>, indent=<span class=\"nm\">2</span>)<br><span class=\"fn\">print</span>(json_str)<br><br><span class=\"cm\"># JSON string → dict (deserialization)</span><br>geri = json.<span class=\"fn\">loads</span>(json_str)<br><span class=\"fn\">print</span>(geri[<span class=\"st\">\"ad\"</span>])<br><br><span class=\"cm\"># HTTP status kodları</span><br><span class=\"cm\"># 200 OK, 201 Created, 400 Bad Request</span><br><span class=\"cm\"># 401 Unauthorized, 404 Not Found, 500 Server Error</span></div><textarea class=\"cb-src\" style=\"display:none\">import json\nkullanici = {\"id\": 1, \"ad\": \"Ali Kaya\", \"email\": \"ali@ornek.com\", \"aktif\": True}\njson_str = json.dumps(kullanici, ensure_ascii=False, indent=2)\nprint(json_str)\ngeri = json.loads(json_str)\nprint(geri[\"ad\"])\n\n# Nested JSON\nveri = {\"kullanicilar\": [{\"id\":1,\"ad\":\"Ali\"},{\"id\":2,\"ad\":\"Berk\"}],\"toplam\":2}\nprint(veri[\"kullanicilar\"][0][\"ad\"])</textarea></div>\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--green)\"></div><h3>Simüle Edilmiş API İstek</h3></div>\n    <div class=\"code-block runnable\"><div class=\"cb-header\"><div class=\"cb-dots\"></div><span class=\"cb-label\">mock_api.py</span><span class=\"cb-run-tag\">▶</span></div><div class=\"cb-body\"><span class=\"kw\">import</span> json<br><br><span class=\"cm\"># Gerçek requests kütüphanesi (Skulpt'ta yok)</span><br><span class=\"cm\"># import requests</span><br><span class=\"cm\"># r = requests.get('https://api.github.com/users/python')</span><br><span class=\"cm\"># print(r.status_code, r.json()['name'])</span><br><br><span class=\"cm\"># Mock API response ile çalışma</span><br><span class=\"kw\">def</span> <span class=\"fn\">mock_api_get</span>(endpoint):<br>&nbsp;&nbsp;&nbsp;&nbsp;db = {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"st\">\"/users/1\"</span>: {<span class=\"st\">\"id\"</span>:<span class=\"nm\">1</span>,<span class=\"st\">\"ad\"</span>:<span class=\"st\">\"Ali\"</span>,<span class=\"st\">\"xp\"</span>:<span class=\"nm\">450</span>},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"st\">\"/users/2\"</span>: {<span class=\"st\">\"id\"</span>:<span class=\"nm\">2</span>,<span class=\"st\">\"ad\"</span>:<span class=\"st\">\"Berk\"</span>,<span class=\"st\">\"xp\"</span>:<span class=\"nm\">820</span>},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"st\">\"/leaderboard\"</span>: [{<span class=\"st\">\"ad\"</span>:<span class=\"st\">\"Berk\"</span>,<span class=\"st\">\"xp\"</span>:<span class=\"nm\">820</span>},{<span class=\"st\">\"ad\"</span>:<span class=\"st\">\"Ali\"</span>,<span class=\"st\">\"xp\"</span>:<span class=\"nm\">450</span>}]<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">return</span> db.get(endpoint, {<span class=\"st\">\"hata\"</span>: <span class=\"st\">\"404 bulunamadı\"</span>})<br><br>kullanici = <span class=\"fn\">mock_api_get</span>(<span class=\"st\">\"/users/1\"</span>)<br><span class=\"fn\">print</span>(<span class=\"st\">f\"{kullanici['ad']}: {kullanici['xp']} XP\"</span>)<br><br>lb = <span class=\"fn\">mock_api_get</span>(<span class=\"st\">\"/leaderboard\"</span>)<br><span class=\"kw\">for</span> i, u <span class=\"kw\">in</span> <span class=\"fn\">enumerate</span>(lb, <span class=\"nm\">1</span>):<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"fn\">print</span>(<span class=\"st\">f\"{i}. {u['ad']}: {u['xp']}\"</span>)</div><textarea class=\"cb-src\" style=\"display:none\">import json\n\ndef mock_api_get(endpoint):\n    db = {\n        \"/users/1\": {\"id\":1,\"ad\":\"Ali\",\"xp\":450},\n        \"/users/2\": {\"id\":2,\"ad\":\"Berk\",\"xp\":820},\n        \"/leaderboard\": [{\"ad\":\"Berk\",\"xp\":820},{\"ad\":\"Ali\",\"xp\":450}]\n    }\n    return db.get(endpoint, {\"hata\": \"404\"})\n\nkullanici = mock_api_get(\"/users/1\")\nprint(f\"{kullanici['ad']}: {kullanici['xp']} XP\")\n\nlb = mock_api_get(\"/leaderboard\")\nfor i, u in enumerate(lb, 1):\n    print(f\"{i}. {u['ad']}: {u['xp']}\")</textarea></div>\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--amber)\"></div><h3>API Hata Yönetimi ve Rate Limit</h3></div>\n    <div class=\"code-block runnable\"><div class=\"cb-header\"><div class=\"cb-dots\"></div><span class=\"cb-label\">api_hata.py</span><span class=\"cb-run-tag\">▶</span></div><div class=\"cb-body\"><span class=\"kw\">import</span> json<br><br><span class=\"kw\">def</span> <span class=\"fn\">api_iste</span>(endpoint, token=<span class=\"kw\">None</span>):<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"cm\"># Gerçek projede: requests.get(url, headers={'Authorization': f'Bearer {token}'})</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">if</span> <span class=\"kw\">not</span> token:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">raise</span> <span class=\"fn\">ValueError</span>(<span class=\"st\">\"API token gerekli\"</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"cm\"># Rate limit simülasyonu</span><br>&nbsp;&nbsp;&nbsp;&nbsp;kalan_istek = <span class=\"nm\">100</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">if</span> kalan_istek < <span class=\"nm\">10</span>:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">print</span>(<span class=\"st\">\"Uyarı: Rate limit yaklaşıyor\"</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">return</span> {<span class=\"st\">\"veri\"</span>: <span class=\"st\">\"sonuc\"</span>, <span class=\"st\">\"kalan\"</span>: kalan_istek}<br><br><span class=\"kw\">try</span>:<br>&nbsp;&nbsp;&nbsp;&nbsp;sonuc = <span class=\"fn\">api_iste</span>(<span class=\"st\">\"/data\"</span>, token=<span class=\"st\">\"abc123\"</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"fn\">print</span>(json.<span class=\"fn\">dumps</span>(sonuc, indent=<span class=\"nm\">2</span>))<br><span class=\"kw\">except</span> <span class=\"fn\">ValueError</span> <span class=\"kw\">as</span> e:<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"fn\">print</span>(<span class=\"st\">f\"Hata: {e}\"</span>)</div><textarea class=\"cb-src\" style=\"display:none\">import json\n\ndef api_iste(endpoint, token=None):\n    if not token:\n        raise ValueError(\"API token gerekli\")\n    kalan = 100\n    if kalan < 10:\n        print(\"Uyari: Rate limit\")\n    return {\"veri\": \"sonuc\", \"kalan\": kalan, \"endpoint\": endpoint}\n\ntry:\n    sonuc = api_iste(\"/data\", token=\"abc123\")\n    print(json.dumps(sonuc, indent=2))\nexcept ValueError as e:\n    print(f\"Hata: {e}\")\n\ntry:\n    api_iste(\"/data\")  # token yok\nexcept ValueError as e:\n    print(f\"Beklenen hata: {e}\")</textarea></div>\n    <div class=\"box deep\"><span class=\"box-icon\">🧠</span><span><strong>requests kütüphanesi gerçek kullanımda:</strong> <code>pip install requests</code>. GET: <code>r = requests.get(url, headers={'Authorization': 'Bearer TOKEN'})</code>. POST: <code>requests.post(url, json={'key':'value'})</code>. r.status_code, r.json(), r.text ile sonuç. Session ile connection pooling: <code>with requests.Session() as s:</code></span></div>\n    <div class=\"box alt\"><span class=\"box-icon\">⚖️</span><span><strong>REST vs GraphQL:</strong> REST: çok endpoint, URL tabanlı kaynak, her endpoint sabit veri döner. GraphQL: tek endpoint, istemci istediği alanı belirtir, over/under-fetching yok. GitHub, Shopify GraphQL kullanıyor. REST öğrenmek GraphQL'e geçişi kolaylaştırır.</span></div>\n    <div class=\"lesson-nav\"><button class=\"nav-btn go\" onclick=\"switchPhase(1)\">🧠 Teste Geç →</button></div>\n  </div>",
      "quiz": [
        {
          "q": "json.dumps() ne yapar?",
          "opts": [
            "JSON dosyası okur",
            "Python dict/list'i JSON string'e çevirir (serialization)",
            "JSON doğrular",
            "Dict kopyalar"
          ],
          "ans": 1,
          "exp": "dumps() = dict to string. loads() = string to dict. Dosyayla: dump() yazar, load() okur. ensure_ascii=False Türkçe karakterleri düzgün çıkarır."
        },
        {
          "q": "HTTP 401 status kodu ne anlama gelir?",
          "opts": [
            "Bulunamadı",
            "Unauthorized — kimlik doğrulama gerekli veya başarısız",
            "Başarılı",
            "Sunucu hatası"
          ],
          "ans": 1,
          "exp": "200 OK, 201 Created, 400 Bad Request (istemci hatası), 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Internal Server Error. API hata yönetiminde status kodu kontrol edilmeli."
        },
        {
          "q": "REST API'de PUT ve PATCH farkı?",
          "opts": [
            "Aynı şey",
            "PUT tüm kaynağı günceller (boş alanlar sıfırlanır), PATCH sadece gönderilen alanları günceller",
            "PUT daha hızlı",
            "PATCH silinmiyor"
          ],
          "ans": 1,
          "exp": "PUT: Kaynağın tüm halini gönder — gönderilmeyen alanlar null/default olur. PATCH: Sadece değişen alanları gönder — diğerleri etkilenmez. Güncelleme için genellikle PATCH daha pratik."
        },
        {
          "q": "Rate limiting neden önemli?",
          "opts": [
            "Performans",
            "API sahibi sunucu yükünü yönetir ve istismar önler — aşılırsa 429 Too Many Requests",
            "Güvenlik",
            "Şifreleme"
          ],
          "ans": 1,
          "exp": "API sağlayıcıları dakikada/saatte X istek sınırı koyar. Aşılırsa 429 alırsın, belki IP ban. time.sleep() ile istek arası bekleme, Retry-After header'ını oku, exponential backoff kullan."
        },
        {
          "q": "Authorization: Bearer TOKEN header ne için kullanılır?",
          "opts": [
            "Encoding",
            "API'ye kimlik doğrulama — token sahibi olduğunu kanıtlar",
            "Rate limit",
            "JSON formatı"
          ],
          "ans": 1,
          "exp": "Bearer token: OAuth2 standardı. Her istekte header olarak gönderilir. API sunucusu token'ı doğrular, geçerliyse isteği işler. Token'ı kod içine hard-code etme — environment variable kullan."
        }
      ],
      "fills": [
        {
          "code": "json_str = json.<input class=\"blank\" data-ans=\"dumps\" placeholder=\"?\" style=\"width:50px\">(veri, indent=<span class=\"nm\">2</span>)",
          "hint": "Dict → JSON string"
        },
        {
          "code": "veri = json.<input class=\"blank\" data-ans=\"loads\" placeholder=\"?\" style=\"width:50px\">(json_str)",
          "hint": "JSON string → dict"
        },
        {
          "code": "kullanici = veri[<input class=\"blank\" data-ans=\"\"kullanicilar\"\" placeholder=\"?\" style=\"width:120px\">][<span class=\"nm\">0</span>]",
          "hint": "Nested JSON erişimi"
        },
        {
          "code": "<span class=\"kw\">if</span> r.status_code == <input class=\"blank\" data-ans=\"200\" placeholder=\"?\" style=\"width:38px\">:<span class=\"cm\">  # başarılı</span>",
          "hint": "Başarılı HTTP kodu"
        },
        {
          "code": "headers = {<span class=\"st\">\"Authorization\"</span>: <span class=\"st\">\"Bearer \"</span> + <input class=\"blank\" data-ans=\"token\" placeholder=\"?\" style=\"width:50px\">}",
          "hint": "Token değişkeni"
        }
      ],
      "drag": [
        {
          "code": "json_str = json.<span class=\"hl\">___</span>(veri)",
          "ans": "dumps",
          "opts": [
            "dumps",
            "loads",
            "dump",
            "load",
            "encode"
          ],
          "exp": "dumps() dict/list'i JSON string'e çevirir"
        },
        {
          "code": "veri = json.<span class=\"hl\">___</span>(json_str)",
          "ans": "loads",
          "opts": [
            "loads",
            "dumps",
            "load",
            "decode",
            "parse"
          ],
          "exp": "loads() JSON string'i dict/list'e çevirir"
        },
        {
          "code": "r = requests.<span class=\"hl\">___</span>(url, headers=hdrs)",
          "ans": "get",
          "opts": [
            "get",
            "post",
            "put",
            "delete",
            "fetch"
          ],
          "exp": "GET: veri okuma — body yok, URL parametreli"
        },
        {
          "code": "r = requests.<span class=\"hl\">___</span>(url, json=data)",
          "ans": "post",
          "opts": [
            "post",
            "get",
            "put",
            "patch",
            "send"
          ],
          "exp": "POST: yeni kayıt oluşturma — body'de JSON veri"
        },
        {
          "code": "if r.status_code == <span class=\"hl\">___</span>:  # başarılı",
          "ans": "200",
          "opts": [
            "200",
            "201",
            "400",
            "404",
            "500"
          ],
          "exp": "200 OK: başarılı GET, PUT. 201: başarılı POST. 4xx: istemci hatası. 5xx: sunucu hatası"
        }
      ],
      "code": {
        "task": "Mock bir kullanıcı API'si simüle et. get_user(id) fonksiyonu kullanıcı dict dönsün (id, ad, email, xp). list_users() tüm kullanıcıları dönsün. add_user(ad, email) yeni kullanıcı eklesin ve dönsün. JSON ile güzel yazdır.",
        "starter": "import json\n\nkullanicilar_db = [\n    {\"id\": 1, \"ad\": \"Ali\", \"email\": \"ali@x.com\", \"xp\": 450},\n    {\"id\": 2, \"ad\": \"Berk\", \"email\": \"berk@x.com\", \"xp\": 820},\n]\n\ndef get_user(user_id):\n    for u in kullanicilar_db:\n        if u[\"id\"] == user_id:\n            return {\"status\": 200, \"data\": u}\n    return {\"status\": 404, \"hata\": \"Kullanici bulunamadi\"}\n\ndef list_users():\n    return {\"status\": 200, \"data\": kullanicilar_db, \"toplam\": len(kullanicilar_db)}\n\ndef add_user(ad, email):\n    yeni_id = max(u[\"id\"] for u in kullanicilar_db) + 1\n    yeni = {\"id\": yeni_id, \"ad\": ad, \"email\": email, \"xp\": 0}\n    kullanicilar_db.append(yeni)\n    return {\"status\": 201, \"data\": yeni}\n\nprint(json.dumps(get_user(1), ensure_ascii=False, indent=2))\nprint(json.dumps(add_user(\"Can\", \"can@x.com\"), ensure_ascii=False, indent=2))\nprint(json.dumps(list_users(), ensure_ascii=False, indent=2))",
        "checkFn": "(code)=>{const c=code;const p=(c.includes('def get_user')?2:0)+(c.includes('def list_users')||c.includes('def add_user')?2:0)+(c.includes('json.dumps')?2:0)+(c.includes('status')?2:0)+((c.match(/print/g)||[]).length>=2?2:0);return{pts:Math.min(p,10),max:10,ok:p>=6,msg:p>=8?'API ustasi! 🌐':p>=6?'Güzel API!':'get, list, add fonksiyonları ve json.dumps kullan.'};",
        "hint": "Her fonksiyon {'status': 200, 'data': ...} formatında dönsün. json.dumps(sonuc, indent=2) ile yazdır."
      }
    }
  },
  {
    "id": "metaprogramming",
    "icon": "🔧",
    "locked": true,
    "title": "Metaprogramlama",
    "desc": "type(), getattr/setattr, __slots__, dinamik kod — Python'un derin katmanları.",
    "phases": {
      "lesson": "<div class=\"lesson-text\">\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--purple)\"></div><h3>Metaprogramlama — Kod Yazana Kod Yaz</h3></div>\n    <p>Metaprogramlama: programın kendi yapısını çalışma zamanında inceleme veya değiştirme yeteneği. Python'da her şey nesne — sınıflar bile. <code>type()</code>, <code>getattr()</code>, <code>__slots__</code>, <code>metaclass</code> ile Python'un en derin katmanına bakış.</p>\n    <div class=\"box why\"><span class=\"box-icon\">🤔</span><span><strong>Neden metaprogramlama?</strong> Django ORM, SQLAlchemy, pytest, dataclasses — hepsinin arkasında metaprogramlama var. Model alanlarını otomatik algılayan ORM, @pytest.fixture ile test kurulumu, @dataclass ile otomatik kod üretimi. Çerçeve/kütüphane yazarken şart. Uygulama yazarken nadiren gerekir ama anlamak iyi.</span></div>\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--blue)\"></div><h3>type() — Sınıf Oluştur</h3></div>\n    <div class=\"code-block runnable\"><div class=\"cb-header\"><div class=\"cb-dots\"></div><span class=\"cb-label\">type_dinamik.py</span><span class=\"cb-run-tag\">▶</span></div><div class=\"cb-body\"><span class=\"cm\"># type(nesne) → tipi göster</span><br><span class=\"fn\">print</span>(<span class=\"fn\">type</span>(<span class=\"nm\">42</span>))&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"cm\"># <class 'int'></span><br><span class=\"fn\">print</span>(<span class=\"fn\">type</span>(<span class=\"st\">\"hello\"</span>))&nbsp;&nbsp;&nbsp;<span class=\"cm\"># <class 'str'></span><br><span class=\"fn\">print</span>(<span class=\"fn\">type</span>(<span class=\"fn\">int</span>))&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"cm\"># <class 'type'></span><br><br><span class=\"cm\"># type(isim, bases, attrs) → yeni sınıf oluştur</span><br><span class=\"fn\">Hayvan</span> = <span class=\"fn\">type</span>(<span class=\"st\">\"Hayvan\"</span>, (), {<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"st\">\"ses\"</span>: <span class=\"kw\">lambda</span> self: <span class=\"st\">\"...\"</span><br>})<br><span class=\"fn\">Kedi</span> = <span class=\"fn\">type</span>(<span class=\"st\">\"Kedi\"</span>, (<span class=\"fn\">Hayvan</span>,), {<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"st\">\"ses\"</span>: <span class=\"kw\">lambda</span> self: <span class=\"st\">\"Miyav\"</span><br>})<br><br>k = <span class=\"fn\">Kedi</span>()<br><span class=\"fn\">print</span>(k.<span class=\"fn\">ses</span>())<span class=\"cm\">  # Miyav</span><br><span class=\"fn\">print</span>(<span class=\"fn\">type</span>(k))<span class=\"cm\">  # <class 'Kedi'></span><br><span class=\"fn\">print</span>(<span class=\"fn\">isinstance</span>(k, <span class=\"fn\">Hayvan</span>))<span class=\"cm\">  # True</span></div><textarea class=\"cb-src\" style=\"display:none\">Hayvan = type(\"Hayvan\", (), {\"ses\": lambda self: \"...\"})\nKedi = type(\"Kedi\", (Hayvan,), {\"ses\": lambda self: \"Miyav\"})\nk = Kedi()\nprint(k.ses())\nprint(type(k))\nprint(isinstance(k, Hayvan))\n\n# type ile dinamik alan ekleme\nprint(dir(k))  # tüm attribute/metodlar\nprint(k.__class__.__name__)</textarea></div>\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--green)\"></div><h3>getattr / setattr / hasattr / delattr</h3></div>\n    <div class=\"code-block runnable\"><div class=\"cb-header\"><div class=\"cb-dots\"></div><span class=\"cb-label\">getattr_ornek.py</span><span class=\"cb-run-tag\">▶</span></div><div class=\"cb-body\"><span class=\"kw\">class</span> <span class=\"fn\">Ayar</span>:<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">def</span> <span class=\"fn\">__init__</span>(<span class=\"kw\">self</span>):<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">self</span>.tema = <span class=\"st\">\"dark\"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">self</span>.dil = <span class=\"st\">\"tr\"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">self</span>.ses = <span class=\"kw\">True</span><br><br>a = <span class=\"fn\">Ayar</span>()<br><br><span class=\"cm\"># String ile attribute eriş</span><br><span class=\"fn\">print</span>(<span class=\"fn\">getattr</span>(a, <span class=\"st\">\"tema\"</span>))&nbsp;&nbsp;<span class=\"cm\"># dark</span><br><span class=\"fn\">setattr</span>(a, <span class=\"st\">\"tema\"</span>, <span class=\"st\">\"light\"</span>)<span class=\"cm\">  # a.tema = 'light'</span><br><span class=\"fn\">print</span>(<span class=\"fn\">hasattr</span>(a, <span class=\"st\">\"dil\"</span>))&nbsp;&nbsp;&nbsp;<span class=\"cm\"># True</span><br><span class=\"fn\">delattr</span>(a, <span class=\"st\">\"ses\"</span>)<span class=\"cm\">  # del a.ses</span><br><br><span class=\"cm\"># Dinamik form verisi işleme</span><br>form_data = {<span class=\"st\">\"tema\"</span>: <span class=\"st\">\"blue\"</span>, <span class=\"st\">\"dil\"</span>: <span class=\"st\">\"en\"</span>}<br><span class=\"kw\">for</span> alan, deger <span class=\"kw\">in</span> form_data.<span class=\"fn\">items</span>():<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">if</span> <span class=\"fn\">hasattr</span>(a, alan):<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"fn\">setattr</span>(a, alan, deger)</div><textarea class=\"cb-src\" style=\"display:none\">class Ayar:\n    def __init__(self):\n        self.tema = \"dark\"\n        self.dil = \"tr\"\n        self.ses = True\na = Ayar()\nprint(getattr(a, \"tema\"))\nsetattr(a, \"tema\", \"light\")\nprint(hasattr(a, \"dil\"))\nform_data = {\"tema\": \"blue\", \"dil\": \"en\"}\nfor alan, deger in form_data.items():\n    if hasattr(a, alan):\n        setattr(a, alan, deger)\nprint(a.tema, a.dil)</textarea></div>\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--amber)\"></div><h3>__slots__ — Bellek Optimizasyonu</h3></div>\n    <div class=\"code-block runnable\"><div class=\"cb-header\"><div class=\"cb-dots\"></div><span class=\"cb-label\">slots.py</span><span class=\"cb-run-tag\">▶</span></div><div class=\"cb-body\"><span class=\"cm\"># Normal sınıf — her instance için __dict__</span><br><span class=\"kw\">class</span> <span class=\"fn\">NormalNokta</span>:<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">def</span> <span class=\"fn\">__init__</span>(<span class=\"kw\">self</span>, x, y):<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">self</span>.x = x;  <span class=\"kw\">self</span>.y = y<br><br><span class=\"cm\"># __slots__ — sabit attribute'lar, __dict__ yok</span><br><span class=\"kw\">class</span> <span class=\"fn\">SlottedNokta</span>:<br>&nbsp;&nbsp;&nbsp;&nbsp;__slots__ = [<span class=\"st\">\"x\"</span>, <span class=\"st\">\"y\"</span>]<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">def</span> <span class=\"fn\">__init__</span>(<span class=\"kw\">self</span>, x, y):<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">self</span>.x = x;  <span class=\"kw\">self</span>.y = y<br><br>import sys<br>n1 = <span class=\"fn\">NormalNokta</span>(<span class=\"nm\">1</span>, <span class=\"nm\">2</span>)<br>n2 = <span class=\"fn\">SlottedNokta</span>(<span class=\"nm\">1</span>, <span class=\"nm\">2</span>)<br><span class=\"fn\">print</span>(sys.<span class=\"fn\">getsizeof</span>(n1), <span class=\"st\">\"vs\"</span>, sys.<span class=\"fn\">getsizeof</span>(n2))<br><span class=\"cm\"># Normal ~48 bytes, Slotted ~32 bytes</span><br><br><span class=\"cm\"># Yeni attribute eklenemez!</span><br><span class=\"cm\"># n2.z = 3  → AttributeError</span></div><textarea class=\"cb-src\" style=\"display:none\">import sys\nclass NormalNokta:\n    def __init__(self, x, y):\n        self.x = x; self.y = y\nclass SlottedNokta:\n    __slots__ = [\"x\", \"y\"]\n    def __init__(self, x, y):\n        self.x = x; self.y = y\nn1 = NormalNokta(1, 2)\nn2 = SlottedNokta(1, 2)\nprint(\"Normal:\", sys.getsizeof(n1))\nprint(\"Slotted:\", sys.getsizeof(n2))\nprint(\"n1 dict:\", n1.__dict__)\ntry:\n    n2.z = 3\nexcept AttributeError as e:\n    print(\"Hata:\", e)</textarea></div>\n    <div class=\"box deep\"><span class=\"box-icon\">🧠</span><span><strong>Metaclass nedir?</strong> Sınıf oluşturan sınıf. type metaclass'ın kendisi. <code>class Meta(type):</code> ile özelleştirilmiş metaclass yazılır. Django'nun Model sınıfı metaclass kullanır — model alanlarını otomatik algılar, SQL tablo oluşturur. Çok nadiren doğrudan yazılır ama güçlü araç.</span></div>\n    <div class=\"box alt\"><span class=\"box-icon\">⚖️</span><span><strong>getattr için default değer:</strong> <code>getattr(nesne, 'alan', varsayılan)</code> — alan yoksa varsayılan döner, AttributeError vermez. Güvenli attribute erişimi için kullanışlı: <code>renk = getattr(ayar, 'renk', 'blue')</code></span></div>\n    <div class=\"lesson-nav\"><button class=\"nav-btn go\" onclick=\"switchPhase(1)\">🧠 Teste Geç →</button></div>\n  </div>",
      "quiz": [
        {
          "q": "type(isim, bases, attrs) ne yapar?",
          "opts": [
            "Tipi döner",
            "Yeni sınıf oluşturur — class anahtar kelimesinin yaptığını dinamik yapar",
            "Attribute siler",
            "Miras alır"
          ],
          "ans": 1,
          "exp": "type() iki kullanım: type(nesne) → tip döner. type(isim, (ust_siniflar,), {metodlar_dict}) → yeni sınıf oluşturur. class Foo: pass ile type('Foo', (), {}) eşdeğer."
        },
        {
          "q": "getattr(nesne, 'alan') ne zaman kullanılır?",
          "opts": [
            "Her zaman",
            "Attribute adı string olarak bilindiğinde — dinamik erişim",
            "Hız için",
            "Private için"
          ],
          "ans": 1,
          "exp": "nesne.alan ile aynı. Ama 'alan' değişken olduğunda getattr şart. Form verisi işleme, config parser, dynamic dispatch — string tabanlı attribute erişimi."
        },
        {
          "q": "__slots__ kullanmanın avantajı ve dezavantajı nedir?",
          "opts": [
            "Sadece avantaj",
            "Avantaj: daha az bellek, daha hızlı erişim. Dezavantaj: yeni attribute eklenemez, __dict__ yok",
            "Dezavantaj yok",
            "Sadece büyük sınıflarda"
          ],
          "ans": 1,
          "exp": "__slots__ __dict__ yerine descriptor kullanır — bellek tasarrufu. Ama: sadece tanımlanan attribute'lar kullanılabilir, dinamik attribute eklenemez, pickle karmaşıklaşır."
        },
        {
          "q": "setattr(nesne, 'alan', deger) ile nesne.alan = deger farkı?",
          "opts": [
            "Fark yok",
            "setattr alan adını runtime'da belirleyebilir — string değişken",
            "setattr daha hızlı",
            "setattr private"
          ],
          "ans": 1,
          "exp": "İkisi de aynı işlemi yapar. Ama setattr ile 'alan' bir değişken olabilir: for alan in alanlar: setattr(obj, alan, ...). .alan yazımı compile-time sabit isim gerektiriyor."
        },
        {
          "q": "Metaprogramlama neden framework'lerde yaygın?",
          "opts": [
            "Daha hızlı",
            "Kullanıcı tanımlı sınıfları otomatik işleyebilir — Django model alanlarını keşfetmek gibi",
            "Zorunlu",
            "Daha az kod"
          ],
          "ans": 1,
          "exp": "Django ORM: model attribute'larını inceleyip SQL tablosu oluşturur. pytest: test_ metodlarını otomatik keşfeder. dataclasses: annotation'ları okuyup __init__ üretir. Hepsi metaprogramlama."
        }
      ],
      "fills": [
        {
          "code": "<span class=\"fn\">print</span>(<span class=\"fn\">type</span>(k).__<input class=\"blank\" data-ans=\"name__\" placeholder=\"?\" style=\"width:60px\">)<span class=\"cm\">  # sınıf adı</span>",
          "hint": "Sınıf adı attribute'u"
        },
        {
          "code": "<span class=\"fn\">print</span>(<span class=\"fn\">getattr</span>(a, <input class=\"blank\" data-ans=\"\"tema\"\" placeholder=\"?\" style=\"width:55px\">))",
          "hint": "String attribute adı"
        },
        {
          "code": "<span class=\"fn\">setattr</span>(a, <input class=\"blank\" data-ans=\"\"dil\"\" placeholder=\"?\" style=\"width:50px\">, <span class=\"st\">\"en\"</span>)<span class=\"cm\">  # a.dil = 'en'</span>",
          "hint": "Alan adı string"
        },
        {
          "code": "<span class=\"fn\">print</span>(<span class=\"fn\">hasattr</span>(a, <input class=\"blank\" data-ans=\"\"ses\"\" placeholder=\"?\" style=\"width:50px\">))<span class=\"cm\">  # var mı?</span>",
          "hint": "Kontrol edilecek alan"
        },
        {
          "code": "&nbsp;&nbsp;&nbsp;&nbsp;__slots__ = [<input class=\"blank\" data-ans=\"\"x\"\" placeholder=\"?\" style=\"width:40px\">, <input class=\"blank\" data-ans=\"\"y\"\" placeholder=\"?\" style=\"width:40px\">]",
          "hint": "İzin verilen alanlar"
        }
      ],
      "drag": [
        {
          "code": "Kedi = <span class=\"hl\">___</span>('Kedi', (Hayvan,), {'ses': ...})",
          "ans": "type",
          "opts": [
            "type",
            "class",
            "create",
            "new",
            "make"
          ],
          "exp": "type() ile dinamik sınıf oluşturulur"
        },
        {
          "code": "deger = <span class=\"hl\">___</span>(obj, 'alan')",
          "ans": "getattr",
          "opts": [
            "getattr",
            "setattr",
            "hasattr",
            "delattr",
            "getprop"
          ],
          "exp": "getattr string ile attribute okur"
        },
        {
          "code": "<span class=\"hl\">___</span>(obj, 'alan', yeni_deger)",
          "ans": "setattr",
          "opts": [
            "setattr",
            "getattr",
            "hasattr",
            "putattr",
            "writeattr"
          ],
          "exp": "setattr string ile attribute yazar"
        },
        {
          "code": "if <span class=\"hl\">___</span>(obj, 'alan'):  # var mı?",
          "ans": "hasattr",
          "opts": [
            "hasattr",
            "getattr",
            "isinstance",
            "type",
            "dir"
          ],
          "exp": "hasattr bool döner — AttributeError vermeden kontrol"
        },
        {
          "code": "class Nokta:<br>    <span class=\"hl\">___</span> = ['x', 'y']",
          "ans": "__slots__",
          "opts": [
            "__slots__",
            "__dict__",
            "__attrs__",
            "__fields__",
            "__vars__"
          ],
          "exp": "__slots__ hangi attribute'lara izin verileceğini tanımlar"
        }
      ],
      "code": {
        "task": "Dinamik konfigürasyon sistemi yaz. Config sınıfı: __slots__ ile tema, dil, ses alanları. uygula(dict) metodu: verilen dict'teki alanları setattr ile uygulasın (sadece izin verilenler). durum() metodu: getattr ile tüm alanları dönsün.",
        "starter": "class Config:\n    __slots__ = ['tema', 'dil', 'ses', 'font_boyutu']\n    \n    def __init__(self):\n        self.tema = 'dark'\n        self.dil = 'tr'\n        self.ses = True\n        self.font_boyutu = 14\n    \n    def uygula(self, ayarlar):\n        for alan, deger in ayarlar.items():\n            if hasattr(self, alan):\n                setattr(self, alan, deger)\n            else:\n                print(f'Bilinmeyen alan: {alan}')\n    \n    def durum(self):\n        sonuc = {}\n        for alan in self.__slots__:\n            sonuc[alan] = getattr(self, alan)\n        return sonuc\n\nc = Config()\nprint('Baslangic:', c.durum())\nc.uygula({'tema': 'light', 'ses': False, 'geçersiz': 'deger'})\nprint('Sonra:', c.durum())",
        "checkFn": "(code)=>{const c=code;const p=(c.includes('__slots__')?2:0)+(c.includes('setattr')?2:0)+(c.includes('getattr')?2:0)+(c.includes('hasattr')?2:0)+((c.match(/print/g)||[]).length>=2?2:0);return{pts:Math.min(p,10),max:10,ok:p>=6,msg:p>=8?'Meta ustasi! 🔧':p>=6?'Güzel metaprog!':'__slots__, setattr, getattr, hasattr kullan.'};",
        "hint": "__slots__ = ['alan1', 'alan2']. setattr(self, alan, deger). getattr(self, alan). hasattr ile önce kontrol et."
      }
    }
  },
  {
    "id": "veri_analizi",
    "icon": "📈",
    "locked": true,
    "title": "Veri Analizi Temelleri",
    "desc": "statistics, csv, defaultdict — verideki deseni keşfet, hikâyeyi oku.",
    "phases": {
      "lesson": "<div class=\"lesson-text\">\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--purple)\"></div><h3>Veri Analizi — Sayıların Hikâyesini Oku</h3></div>\n    <p>Ham veri anlamsızdır. Analiz: ortalama, dağılım, trend, korelasyon — verideki deseni bulmak. Python'da <code>csv</code>, <code>json</code>, <code>statistics</code> modülleriyle kütüphane kurmadan güçlü analiz yapabilirsin. Gerçek projelerde pandas/numpy kullanılır ama temel aynı.</p>\n    <div class=\"box why\"><span class=\"box-icon\">🤔</span><span><strong>Neden veri analizi?</strong> Satışlarının hangi ay düştüğünü, hangi kullanıcı grubunun en aktif olduğunu, hangi hata en çok tekrar ettiğini bulmak için. Her alanda karar vermeyi destekler: iş, bilim, mühendislik, eğitim. Veri okuryazarlığı modern çağın temel becerisi.</span></div>\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--blue)\"></div><h3>statistics Modülü — Temel İstatistik</h3></div>\n    <div class=\"code-block runnable\"><div class=\"cb-header\"><div class=\"cb-dots\"></div><span class=\"cb-label\">istatistik.py</span><span class=\"cb-run-tag\">▶</span></div><div class=\"cb-body\"><span class=\"kw\">import</span> statistics <span class=\"kw\">as</span> st<br><br>notlar = [<span class=\"nm\">78</span>, <span class=\"nm\">85</span>, <span class=\"nm\">92</span>, <span class=\"nm\">61</span>, <span class=\"nm\">88</span>, <span class=\"nm\">74</span>, <span class=\"nm\">95</span>, <span class=\"nm\">82</span>, <span class=\"nm\">69</span>, <span class=\"nm\">91</span>]<br><br><span class=\"fn\">print</span>(<span class=\"st\">f\"Ortalama: {st.mean(notlar):.1f}\"</span>)<br><span class=\"fn\">print</span>(<span class=\"st\">f\"Medyan:   {st.median(notlar):.1f}\"</span>)<br><span class=\"fn\">print</span>(<span class=\"st\">f\"Standart sapma: {st.stdev(notlar):.2f}\"</span>)<br><span class=\"fn\">print</span>(<span class=\"st\">f\"Varyans: {st.variance(notlar):.2f}\"</span>)<br><span class=\"fn\">print</span>(<span class=\"st\">f\"Min: {min(notlar)}, Maks: {max(notlar)}\"</span>)<br><br><span class=\"cm\"># Mod — en sık tekrar eden</span><br>gunler = [<span class=\"st\">\"Pazartesi\"</span>, <span class=\"st\">\"Salı\"</span>, <span class=\"st\">\"Pazartesi\"</span>, <span class=\"st\">\"Çarşamba\"</span>, <span class=\"st\">\"Pazartesi\"</span>]<br><span class=\"fn\">print</span>(<span class=\"st\">f\"Mod: {st.mode(gunler)}\"</span>)<br><br><span class=\"cm\"># Quantiles</span><br>q = st.<span class=\"fn\">quantiles</span>(notlar, n=<span class=\"nm\">4</span>)<br><span class=\"fn\">print</span>(<span class=\"st\">f\"Q1={q[0]:.0f}, Q2={q[1]:.0f}, Q3={q[2]:.0f}\"</span>)</div><textarea class=\"cb-src\" style=\"display:none\">import statistics as st\nnotlar = [78, 85, 92, 61, 88, 74, 95, 82, 69, 91]\nprint(f\"Ortalama: {st.mean(notlar):.1f}\")\nprint(f\"Medyan:   {st.median(notlar):.1f}\")\nprint(f\"Std sapma: {st.stdev(notlar):.2f}\")\nprint(f\"Min: {min(notlar)}, Maks: {max(notlar)}\")\ngunler = [\"Pzt\",\"Sal\",\"Pzt\",\"Car\",\"Pzt\"]\nprint(f\"Mod: {st.mode(gunler)}\")\nq = st.quantiles(notlar, n=4)\nprint(f\"Q1={q[0]:.0f}, Q2={q[1]:.0f}, Q3={q[2]:.0f}\")</textarea></div>\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--green)\"></div><h3>CSV Analizi — Gerçek Veri Akışı</h3></div>\n    <div class=\"code-block runnable\"><div class=\"cb-header\"><div class=\"cb-dots\"></div><span class=\"cb-label\">csv_analiz.py</span><span class=\"cb-run-tag\">▶</span></div><div class=\"cb-body\"><span class=\"kw\">import</span> csv, statistics, io<br><br><span class=\"cm\"># Simüle CSV verisi</span><br>csv_veri = <span class=\"st\">\"\"\"ad,bolum,maas,deneyim</span><br>Ali,Mühendislik,85000,5<br>Berk,Pazarlama,62000,3<br>Can,Mühendislik,92000,7<br>Deniz,İK,55000,2<br>Elif,Mühendislik,78000,4<br><span class=\"st\">\"\"\"</span><br><br>okuyucu = csv.<span class=\"fn\">DictReader</span>(io.<span class=\"fn\">StringIO</span>(csv_veri))<br>calisanlar = <span class=\"fn\">list</span>(okuyucu)<br><br><span class=\"cm\"># Bölüme göre ortalama maaş</span><br>bolumler = {}<br><span class=\"kw\">for</span> c <span class=\"kw\">in</span> calisanlar:<br>&nbsp;&nbsp;&nbsp;&nbsp;bol = c[<span class=\"st\">\"bolum\"</span>]<br>&nbsp;&nbsp;&nbsp;&nbsp;bolumler.<span class=\"fn\">setdefault</span>(bol, []).<span class=\"fn\">append</span>(<span class=\"fn\">int</span>(c[<span class=\"st\">\"maas\"</span>]))<br><span class=\"kw\">for</span> bol, maaslar <span class=\"kw\">in</span> bolumler.<span class=\"fn\">items</span>():<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"fn\">print</span>(<span class=\"st\">f\"{bol}: ort={statistics.mean(maaslar):,.0f} TL\"</span>)</div><textarea class=\"cb-src\" style=\"display:none\">import csv, statistics, io\ncsv_veri = \"\"\"ad,bolum,maas,deneyim\nAli,Muhendislik,85000,5\nBerk,Pazarlama,62000,3\nCan,Muhendislik,92000,7\nDeniz,IK,55000,2\nElif,Muhendislik,78000,4\n\"\"\"\nokuyucu = csv.DictReader(io.StringIO(csv_veri))\ncalisanlar = list(okuyucu)\nbolumler = {}\nfor c in calisanlar:\n    bol = c[\"bolum\"]\n    bolumler.setdefault(bol, []).append(int(c[\"maas\"]))\nfor bol, maaslar in bolumler.items():\n    print(f\"{bol}: ort={statistics.mean(maaslar):,} TL\")</textarea></div>\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--amber)\"></div><h3>Gruplama ve Özet İstatistik</h3></div>\n    <div class=\"code-block runnable\"><div class=\"cb-header\"><div class=\"cb-dots\"></div><span class=\"cb-label\">gruplama.py</span><span class=\"cb-run-tag\">▶</span></div><div class=\"cb-body\"><span class=\"kw\">from</span> collections <span class=\"kw\">import</span> Counter, defaultdict<br><span class=\"kw\">import</span> statistics<br><br>satislar = [<br>&nbsp;&nbsp;&nbsp;&nbsp;{<span class=\"st\">\"ay\"</span>: <span class=\"nm\">1</span>, <span class=\"st\">\"urun\"</span>: <span class=\"st\">\"A\"</span>, <span class=\"st\">\"adet\"</span>: <span class=\"nm\">120</span>},<br>&nbsp;&nbsp;&nbsp;&nbsp;{<span class=\"st\">\"ay\"</span>: <span class=\"nm\">1</span>, <span class=\"st\">\"urun\"</span>: <span class=\"st\">\"B\"</span>, <span class=\"st\">\"adet\"</span>: <span class=\"nm\">85</span>},<br>&nbsp;&nbsp;&nbsp;&nbsp;{<span class=\"st\">\"ay\"</span>: <span class=\"nm\">2</span>, <span class=\"st\">\"urun\"</span>: <span class=\"st\">\"A\"</span>, <span class=\"st\">\"adet\"</span>: <span class=\"nm\">140</span>},<br>&nbsp;&nbsp;&nbsp;&nbsp;{<span class=\"st\">\"ay\"</span>: <span class=\"nm\">2</span>, <span class=\"st\">\"urun\"</span>: <span class=\"st\">\"B\"</span>, <span class=\"st\">\"adet\"</span>: <span class=\"nm\">95</span>}<br>]<br><br><span class=\"cm\"># Ürüne göre toplam</span><br>toplam = <span class=\"fn\">defaultdict</span>(<span class=\"fn\">int</span>)<br><span class=\"kw\">for</span> s <span class=\"kw\">in</span> satislar:<br>&nbsp;&nbsp;&nbsp;&nbsp;toplam[s[<span class=\"st\">\"urun\"</span>]] += s[<span class=\"st\">\"adet\"</span>]<br><span class=\"kw\">for</span> urun, adet <span class=\"kw\">in</span> <span class=\"fn\">sorted</span>(toplam.<span class=\"fn\">items</span>()):<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"fn\">print</span>(<span class=\"st\">f\"{urun}: {adet} adet\"</span>)<br><br><span class=\"cm\"># Aylık trend</span><br>aylik = <span class=\"fn\">defaultdict</span>(<span class=\"fn\">list</span>)<br><span class=\"kw\">for</span> s <span class=\"kw\">in</span> satislar:<br>&nbsp;&nbsp;&nbsp;&nbsp;aylik[s[<span class=\"st\">\"ay\"</span>]].<span class=\"fn\">append</span>(s[<span class=\"st\">\"adet\"</span>])<br><span class=\"kw\">for</span> ay, adetler <span class=\"kw\">in</span> <span class=\"fn\">sorted</span>(aylik.<span class=\"fn\">items</span>()):<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"fn\">print</span>(<span class=\"st\">f\"Ay {ay}: toplam={sum(adetler)}, ort={statistics.mean(adetler):.0f}\"</span>)</div><textarea class=\"cb-src\" style=\"display:none\">from collections import defaultdict\nimport statistics\nsatislar = [\n    {\"ay\": 1, \"urun\": \"A\", \"adet\": 120},\n    {\"ay\": 1, \"urun\": \"B\", \"adet\": 85},\n    {\"ay\": 2, \"urun\": \"A\", \"adet\": 140},\n    {\"ay\": 2, \"urun\": \"B\", \"adet\": 95}\n]\ntoplam = defaultdict(int)\nfor s in satislar:\n    toplam[s[\"urun\"]] += s[\"adet\"]\nfor urun, adet in sorted(toplam.items()):\n    print(f\"{urun}: {adet} adet\")\naylik = defaultdict(list)\nfor s in satislar:\n    aylik[s[\"ay\"]].append(s[\"adet\"])\nfor ay, adetler in sorted(aylik.items()):\n    print(f\"Ay {ay}: toplam={sum(adetler)}, ort={statistics.mean(adetler):.0f}\")</textarea></div>\n    <div class=\"box tip\"><span class=\"box-icon\">💡</span><span><strong>statistics modülü sınırları:</strong> Küçük-orta veri setleri için yeterli. Büyük veri, vektör işlemleri, makine öğrenmesi için numpy + pandas + scikit-learn gerekir. Ama temel istatistik kavramları aynı — burada öğrendiklerini orada da kullanırsın.</span></div>\n    <div class=\"box deep\"><span class=\"box-icon\">🧠</span><span><strong>Medyan vs Ortalama:</strong> Aşırı değerlere dayanıklılık farkı. 10 çalışanın maaşı: 9×50000 + 1×5000000. Ortalama: 545000 TL (yanıltıcı). Medyan: 50000 TL (gerçeği yansıtıyor). Gelir dağılımı, konut fiyatı gibi çarpık dağılımlarda medyan daha anlamlı.</span></div>\n    <div class=\"lesson-nav\"><button class=\"nav-btn go\" onclick=\"switchPhase(1)\">🧠 Teste Geç →</button></div>\n  </div>",
      "quiz": [
        {
          "q": "Medyan ve ortalama ne zaman farklılaşır?",
          "opts": [
            "Hiçbir zaman",
            "Aşırı değerler (outlier) varken — veri çarpık dağılımlıysa medyan daha temsil edici",
            "Küçük veride",
            "Negatif sayılarda"
          ],
          "ans": 1,
          "exp": "Ortalama tüm değerlere eşit ağırlık verir — bir aşırı değer tüm ortalamayı çeker. Medyan ortadaki değer — aşırılıklardan etkilenmez. Gelir, ev fiyatı gibi sağa çarpık dağılımlarda medyan tercih edilir."
        },
        {
          "q": "Standart sapma ne anlama gelir?",
          "opts": [
            "Maksimum-minimum fark",
            "Değerlerin ortalamadan ortalama uzaklığı — dağılımın genişliği",
            "Mod",
            "Medyan farkı"
          ],
          "ans": 1,
          "exp": "Küçük std: değerler birbirine yakın, homojen. Büyük std: değerler yayılmış, heterojen. Sınıf notları: std=5 (herkes benzer), std=20 (büyük fark). Risk değerlendirmede kritik."
        },
        {
          "q": "csv.DictReader ne avantajı sağlar?",
          "opts": [
            "Daha hızlı",
            "Her satırı tuple yerine dict olarak döner — sütun adıyla erişim: satir['ad']",
            "Büyük dosyalar için",
            "Otomatik parse"
          ],
          "ans": 1,
          "exp": "csv.reader: tuple döner, satir[0], satir[1]. DictReader: ilk satırı header olarak alır, her satır {'ad': 'Ali', 'maas': '85000'} gibi dict döner. Okunabilirlik çok daha iyi."
        },
        {
          "q": "defaultdict(list) ne işe yarar?",
          "opts": [
            "Dict kopyalar",
            "Eksik key için otomatik boş liste oluşturur — setdefault yazmak gerekmez",
            "Sadece list için",
            "Sıralama yapar"
          ],
          "ans": 1,
          "exp": "Normal dict: d['key'] yoksa KeyError. defaultdict(list): d['key'] yoksa otomatik [] oluşturur. Gruplama için mükemmel: d[grup].append(değer)"
        },
        {
          "q": "statistics.quantiles(veri, n=4) ne döner?",
          "opts": [
            "4 eleman",
            "Q1, Q2, Q3 değerleri — veriyi 4 eşit parçaya bölen noktalar",
            "Mod",
            "Varyans"
          ],
          "ans": 1,
          "exp": "Quantiles (çeyrekler): Q1 (%25), Q2 (%50=medyan), Q3 (%75). IQR=Q3-Q1 aşırı değer tespitinde kullanılır. n=10 ile decile, n=100 ile percentile hesaplanır."
        }
      ],
      "fills": [
        {
          "code": "<span class=\"kw\">import</span> <input class=\"blank\" data-ans=\"statistics\" placeholder=\"?\" style=\"width:88px\"> <span class=\"kw\">as</span> st",
          "hint": "İstatistik modülü"
        },
        {
          "code": "<span class=\"fn\">print</span>(st.<input class=\"blank\" data-ans=\"mean\" placeholder=\"?\" style=\"width:42px\">(notlar))<span class=\"cm\">  # ortalama</span>",
          "hint": "Ortalama fonksiyonu"
        },
        {
          "code": "<span class=\"fn\">print</span>(st.<input class=\"blank\" data-ans=\"stdev\" placeholder=\"?\" style=\"width:48px\">(notlar))<span class=\"cm\">  # std sapma</span>",
          "hint": "Standart sapma"
        },
        {
          "code": "okuyucu = csv.<input class=\"blank\" data-ans=\"DictReader\" placeholder=\"?\" style=\"width:88px\">(dosya)",
          "hint": "Dict olarak okuma"
        },
        {
          "code": "grp = <input class=\"blank\" data-ans=\"defaultdict\" placeholder=\"?\" style=\"width:95px\">(<span class=\"fn\">list</span>)<span class=\"cm\">  # gruplama</span>",
          "hint": "Otomatik liste oluşturan dict"
        }
      ],
      "drag": [
        {
          "code": "st.<span class=\"hl\">___</span>(notlar)  # ortalama",
          "ans": "mean",
          "opts": [
            "mean",
            "median",
            "mode",
            "stdev",
            "variance"
          ],
          "exp": "mean() aritmetik ortalama — tüm değerlerin toplamı / sayı"
        },
        {
          "code": "st.<span class=\"hl\">___</span>(notlar)  # ortadaki değer",
          "ans": "median",
          "opts": [
            "median",
            "mean",
            "mode",
            "middle",
            "center"
          ],
          "exp": "median() ortadaki değer — aşırılıklardan etkilenmez"
        },
        {
          "code": "st.<span class=\"hl\">___</span>(notlar)  # yayılım ölçüsü",
          "ans": "stdev",
          "opts": [
            "stdev",
            "variance",
            "spread",
            "range",
            "deviation"
          ],
          "exp": "stdev() standart sapma — değerlerin ortalamadan uzaklığı"
        },
        {
          "code": "grp = <span class=\"hl\">___</span>(list)  # gruplama için",
          "ans": "defaultdict",
          "opts": [
            "defaultdict",
            "dict",
            "Counter",
            "OrderedDict",
            "setdefault"
          ],
          "exp": "defaultdict eksik key'de otomatik varsayılan değer oluşturur"
        },
        {
          "code": "okuyucu = csv.<span class=\"hl\">___</span>(dosya)",
          "ans": "DictReader",
          "opts": [
            "DictReader",
            "reader",
            "csvReader",
            "dictReader",
            "parse"
          ],
          "exp": "DictReader header'ı otomatik alır, satırları dict döner"
        }
      ],
      "code": {
        "task": "Öğrenci not listesini analiz et. 10 öğrenci için ad ve not içeren bir liste oluştur. statistics ile: ortalama, medyan, std sapma hesapla. 70 üstü kaç öğrenci geçti? En yüksek ve en düşük not kimin?",
        "starter": "import statistics\n\nogrenciler = [\n    ('Ali', 78), ('Berk', 92), ('Can', 65), ('Deniz', 88),\n    ('Elif', 71), ('Fatma', 95), ('Gül', 58), ('Hakan', 83),\n    ('Ipek', 76), ('Jale', 69)\n]\n\nnotlar = [n for _, n in ogrenciler]\n\nprint(f'Ortalama: {statistics.mean(notlar):.1f}')\nprint(f'Medyan: {statistics.median(notlar):.1f}')\nprint(f'Std Sapma: {statistics.stdev(notlar):.2f}')\n\ngecen = [(ad, n) for ad, n in ogrenciler if n >= 70]\nprint(f'Gecen: {len(gecen)}/{len(ogrenciler)}')\n\nen_yuksek = max(ogrenciler, key=lambda x: x[1])\nen_dusuk = min(ogrenciler, key=lambda x: x[1])\nprint(f'En yüksek: {en_yuksek[0]} ({en_yuksek[1]})')\nprint(f'En düsük: {en_dusuk[0]} ({en_dusuk[1]})')",
        "checkFn": "(code)=>{const c=code;const p=(c.includes('statistics.mean')?2:0)+(c.includes('statistics.median')?2:0)+(c.includes('statistics.stdev')||c.includes('statistics.variance')?2:0)+(c.includes('max(')||c.includes('min(')?2:0)+((c.match(/print/g)||[]).length>=3?2:0);return{pts:Math.min(p,10),max:10,ok:p>=6,msg:p>=8?'Analiz ustasi! 📈':p>=6?'Güzel analiz!':'statistics.mean, median, stdev ve max/min kullan.'};",
        "hint": "notlar = [n for _, n in ogrenciler] ile sadece notları çıkar. statistics fonksiyonlarını bu liste ile çalıştır."
      }
    }
  },
  {
    "id": "tkinter_gui",
    "icon": "🖥️",
    "locked": true,
    "title": "tkinter ile GUI",
    "desc": "Pencere, buton, giriş alanı, grid layout, StringVar — masaüstü uygulama yap.",
    "phases": {
      "lesson": "<div class=\"lesson-text\">\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--purple)\"></div><h3>tkinter — Masaüstü Arayüz Yap</h3></div>\n    <p>Python kodu yazdın ama sadece terminalde çalışıyor. tkinter ile <strong>gerçek pencere, buton, giriş alanı, etiket</strong> içeren masaüstü uygulaması yapabilirsin — Python'a dahili gelir, kurulum gerekmez. Basit ama işlevsel.</p>\n    <div class=\"box why\"><span class=\"box-icon\">🤔</span><span><strong>Neden tkinter?</strong> Hesap makinesi, not defteri, dosya dönüştürücü, mini araçlar — terminal yerine GUI çok daha kullanıcı dostu. PyQt5/PySide6 daha güçlü ama kurulum + öğrenme eğrisi büyük. tkinter: sıfır kurulum, Python ile gelir, prototip ve küçük araçlar için ideal.</span></div>\n    <div class=\"box warn\"><span class=\"box-icon\">⚠️</span><span><strong>Tarayıcı ortamı:</strong> tkinter pencere açtığı için Skulpt'ta çalışmaz. Kodları kendi bilgisayarında çalıştır: <code>python3 dosya.py</code>. PyLab'da konsept ve syntax öğren, gerçek çalışma kendi makinende.</span></div>\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--blue)\"></div><h3>Temel Widget'lar</h3></div>\n    <div class=\"code-block runnable\"><div class=\"cb-header\"><div class=\"cb-dots\"></div><span class=\"cb-label\">tkinter_temel.py (kendi makinende çalıştır)</span><span class=\"cb-run-tag\">▶</span></div><div class=\"cb-body\"><span class=\"kw\">import</span> tkinter <span class=\"kw\">as</span> tk<br><span class=\"kw\">from</span> tkinter <span class=\"kw\">import</span> ttk<br><br><span class=\"cm\"># Ana pencere</span><br>pencere = tk.<span class=\"fn\">Tk</span>()<br>pencere.<span class=\"fn\">title</span>(<span class=\"st\">\"Benim Uygulamam\"</span>)<br>pencere.<span class=\"fn\">geometry</span>(<span class=\"st\">\"400x300\"</span>)<br><br><span class=\"cm\"># Etiket</span><br>etiket = tk.<span class=\"fn\">Label</span>(pencere, text=<span class=\"st\">\"Merhaba!\"</span>, font=(<span class=\"st\">\"Arial\"</span>,<span class=\"nm\">16</span>))<br>etiket.<span class=\"fn\">pack</span>(pady=<span class=\"nm\">10</span>)<br><br><span class=\"cm\"># Giriş alanı</span><br>giris = tk.<span class=\"fn\">Entry</span>(pencere, width=<span class=\"nm\">30</span>)<br>giris.<span class=\"fn\">pack</span>(pady=<span class=\"nm\">5</span>)<br><br><span class=\"cm\"># Buton + komut</span><br><span class=\"kw\">def</span> <span class=\"fn\">tikla</span>():<br>&nbsp;&nbsp;&nbsp;&nbsp;etiket.<span class=\"fn\">config</span>(text=<span class=\"st\">f\"Merhaba, {giris.get()}!\"</span>)<br>buton = tk.<span class=\"fn\">Button</span>(pencere, text=<span class=\"st\">\"Selamla\"</span>, command=<span class=\"fn\">tikla</span>)<br>buton.<span class=\"fn\">pack</span>(pady=<span class=\"nm\">10</span>)<br><br>pencere.<span class=\"fn\">mainloop</span>()<span class=\"cm\">  # Event loop başlat</span></div><textarea class=\"cb-src\" style=\"display:none\">import tkinter as tk\n\npencere = tk.Tk()\npencere.title(\"Benim Uygulamam\")\npencere.geometry(\"400x300\")\n\netiket = tk.Label(pencere, text=\"Merhaba!\", font=(\"Arial\", 16))\netiket.pack(pady=10)\n\ngiris = tk.Entry(pencere, width=30)\ngiris.pack(pady=5)\n\ndef tikla():\n    ad = giris.get()\n    etiket.config(text=f\"Merhaba, {ad}!\" if ad else \"Bir isim gir!\")\n\nbuton = tk.Button(pencere, text=\"Selamla\", command=tikla)\nbuton.pack(pady=10)\n\npencere.mainloop()</textarea></div>\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--green)\"></div><h3>Layout — pack, grid, place</h3></div>\n    <table class='cmp-table'><tr><th>Layout</th><th>Nasıl çalışır</th><th>Ne zaman?</th></tr><tr><td><code>pack()</code></td><td>Sırayla yerleştirir</td><td>Basit dikey/yatay düzen</td></tr><tr><td><code>grid(row, col)</code></td><td>Tablo gibi hücrelere</td><td>Form, hesap makinesi</td></tr><tr><td><code>place(x, y)</code></td><td>Piksel koordinatı</td><td>Özel konumlandırma</td></tr></table>\n    <div class=\"code-block runnable\"><div class=\"cb-header\"><div class=\"cb-dots\"></div><span class=\"cb-label\">grid_layout.py (kendi makinende)</span><span class=\"cb-run-tag\">▶</span></div><div class=\"cb-body\"><span class=\"kw\">import</span> tkinter <span class=\"kw\">as</span> tk<br><br>pencere = tk.<span class=\"fn\">Tk</span>()<br>pencere.<span class=\"fn\">title</span>(<span class=\"st\">\"Hesap Makinesi\"</span>)<br><br><span class=\"cm\"># Grid layout — 3x3 tuş takımı</span><br>tuslar = [<br>&nbsp;&nbsp;&nbsp;&nbsp;[<span class=\"st\">\"7\"</span>, <span class=\"st\">\"8\"</span>, <span class=\"st\">\"9\"</span>, <span class=\"st\">\"/\"</span>],<br>&nbsp;&nbsp;&nbsp;&nbsp;[<span class=\"st\">\"4\"</span>, <span class=\"st\">\"5\"</span>, <span class=\"st\">\"6\"</span>, <span class=\"st\">\"*\"</span>],<br>&nbsp;&nbsp;&nbsp;&nbsp;[<span class=\"st\">\"1\"</span>, <span class=\"st\">\"2\"</span>, <span class=\"st\">\"3\"</span>, <span class=\"st\">\"-\"</span>],<br>&nbsp;&nbsp;&nbsp;&nbsp;[<span class=\"st\">\"0\"</span>, <span class=\"st\">\".\"</span>, <span class=\"st\">\"=\"</span>, <span class=\"st\">\"+\"</span>]<br>]<br>ekran = tk.<span class=\"fn\">Entry</span>(pencere, width=<span class=\"nm\">20</span>, font=(<span class=\"st\">\"Arial\"</span>, <span class=\"nm\">14</span>))<br>ekran.<span class=\"fn\">grid</span>(row=<span class=\"nm\">0</span>, column=<span class=\"nm\">0</span>, columnspan=<span class=\"nm\">4</span>)<br><span class=\"kw\">for</span> satir_i, satir <span class=\"kw\">in</span> <span class=\"fn\">enumerate</span>(tuslar, <span class=\"nm\">1</span>):<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">for</span> sutun_i, tus <span class=\"kw\">in</span> <span class=\"fn\">enumerate</span>(satir):<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;tk.<span class=\"fn\">Button</span>(pencere, text=tus, width=<span class=\"nm\">4</span>).<span class=\"fn\">grid</span>(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;row=satir_i, column=sutun_i)<br>pencere.<span class=\"fn\">mainloop</span>()</div><textarea class=\"cb-src\" style=\"display:none\">import tkinter as tk\npencere = tk.Tk()\npencere.title(\"Hesap Makinesi\")\nekran = tk.Entry(pencere, width=20, font=(\"Arial\", 14))\nekran.grid(row=0, column=0, columnspan=4)\ntuslar = [[\"7\",\"8\",\"9\",\"/\"],[  \"4\",\"5\",\"6\",\"*\"],[\"1\",\"2\",\"3\",\"-\"],[\"0\",\".\",\"=\",\"+\"]]\nfor si, satir in enumerate(tuslar, 1):\n    for ci, tus in enumerate(satir):\n        tk.Button(pencere, text=tus, width=4).grid(row=si, column=ci)\npencere.mainloop()</textarea></div>\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--amber)\"></div><h3>StringVar ve Bağlantılı Değişkenler</h3></div>\n    <div class=\"code-block runnable\"><div class=\"cb-header\"><div class=\"cb-dots\"></div><span class=\"cb-label\">stringvar.py (kendi makinende)</span><span class=\"cb-run-tag\">▶</span></div><div class=\"cb-body\"><span class=\"kw\">import</span> tkinter <span class=\"kw\">as</span> tk<br><br>pencere = tk.<span class=\"fn\">Tk</span>()<br>pencere.<span class=\"fn\">title</span>(<span class=\"st\">\"StringVar Örneği\"</span>)<br><br><span class=\"cm\"># StringVar — widget ile iki yönlü bağ</span><br>isim_var = tk.<span class=\"fn\">StringVar</span>(value=<span class=\"st\">\"Kullanıcı\"</span>)<br>ses_var = tk.<span class=\"fn\">BooleanVar</span>(value=<span class=\"kw\">True</span>)<br><br><span class=\"cm\"># Label otomatik güncellenir</span><br>tk.<span class=\"fn\">Label</span>(pencere, textvariable=isim_var).pack()<br>tk.<span class=\"fn\">Entry</span>(pencere, textvariable=isim_var).pack()<br><br><span class=\"cm\"># Checkbutton</span><br>tk.<span class=\"fn\">Checkbutton</span>(pencere, text=<span class=\"st\">\"Ses açık\"</span>, variable=ses_var).pack()<br><span class=\"kw\">def</span> <span class=\"fn\">goster</span>():<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"fn\">print</span>(<span class=\"st\">f\"İsim: {isim_var.get()}, Ses: {ses_var.get()}\"</span>)<br>tk.<span class=\"fn\">Button</span>(pencere, text=<span class=\"st\">\"Göster\"</span>, command=<span class=\"fn\">goster</span>).pack()<br>pencere.<span class=\"fn\">mainloop</span>()</div><textarea class=\"cb-src\" style=\"display:none\">import tkinter as tk\npencere = tk.Tk()\nisim_var = tk.StringVar(value=\"Kullanici\")\nses_var = tk.BooleanVar(value=True)\ntk.Label(pencere, textvariable=isim_var).pack()\ntk.Entry(pencere, textvariable=isim_var).pack()\ntk.Checkbutton(pencere, text=\"Ses acik\", variable=ses_var).pack()\ndef goster():\n    print(f\"Isim: {isim_var.get()}, Ses: {ses_var.get()}\")\ntk.Button(pencere, text=\"Goster\", command=goster).pack()\npencere.mainloop()</textarea></div>\n    <div class=\"box alt\"><span class=\"box-icon\">⚖️</span><span><strong>tkinter sonrası alternatifler:</strong> PyQt5/PySide6: profesyonel, büyük projeler, Qt tasarımcısı. tkinter: dahili, basit araçlar. Kivy: mobil + masaüstü, touch destekli. Dear PyGui: GPU hızlandırmalı, oyun/animasyon. Web UI için: Flask + HTML ile tarayıcıda arayüz — mobil de çalışır.</span></div>\n    <div class=\"box deep\"><span class=\"box-icon\">🧠</span><span><strong>Event-driven programlama:</strong> mainloop() bir döngü — mouse tıklaması, tuş basımı, pencere yeniden boyutlandırma gibi olayları bekler. Bir olay gelince ilgili callback fonksiyon çağrılır. Bu model Web (addEventListener), GUI (signal/slot), oyun motorlarında (event system) evrenseldir.</span></div>\n    <div class=\"lesson-nav\"><button class=\"nav-btn go\" onclick=\"switchPhase(1)\">🧠 Teste Geç →</button></div>\n  </div>",
      "quiz": [
        {
          "q": "mainloop() ne işe yarar?",
          "opts": [
            "Programı kapatır",
            "Olay döngüsünü başlatır — pencere açık kalır, kullanıcı etkileşimlerini bekler",
            "GUI'yi yeniler",
            "Widget yerleştirir"
          ],
          "ans": 1,
          "exp": "mainloop() bloke edici döngü — pencere kapatılana kadar çalışır. Mouse, klavye, zamanlayıcı gibi olayları dinler ve ilgili callback'leri çağırır. Olmadan pencere anında kapanır."
        },
        {
          "q": "grid() ile pack() farkı nedir?",
          "opts": [
            "Aynı",
            "grid: satır/sütun koordinatlı tablo düzeni. pack: sıralı otomatik yerleşim",
            "grid daha hızlı",
            "pack daha iyi"
          ],
          "ans": 1,
          "exp": "pack(): sıradaki boş alana yerleştirir — basit liste/menü. grid(row, column): tablo hücrelerine tam kontrol — form, hesap makinesi tuşları. İkisi aynı pencerede karıştırılmamalı."
        },
        {
          "q": "StringVar neden doğrudan string yerine kullanılır?",
          "opts": [
            "Daha hızlı",
            "Widget ile iki yönlü bağ — değişken değişince widget otomatik güncellenir",
            "Zorunlu",
            "String yetersiz"
          ],
          "ans": 1,
          "exp": "StringVar: tkinter'ın gözlemlenebilir değişkeni. textvariable=isim_var bağlanan widget, isim_var.set('yeni') çağrıldığında otomatik güncellenir. Tersine Entry'e yazılınca da değişken güncellenir."
        },
        {
          "q": "widget.config() ne zaman kullanılır?",
          "opts": [
            "Widget silmek için",
            "Mevcut widget'ın özelliklerini çalışma zamanında değiştirmek için",
            "Layout için",
            "Event için"
          ],
          "ans": 1,
          "exp": "config(): label.config(text='yeni') gibi widget oluştuktan sonra özellik değiştirme. Alternatif: widget['text'] = 'yeni'. Dinamik UI güncellemelerinin temel yolu."
        },
        {
          "q": "tkinter'ın kısıtı nedir?",
          "opts": [
            "Yavaş",
            "Platform bağımlı görünüm, sınırlı widget seti, modern UI zorlukları — büyük projeler için PyQt önerilir",
            "Kurulum gerekir",
            "Python 2 için"
          ],
          "ans": 1,
          "exp": "tkinter: dahili, kolay, hızlı başlangıç. Ama modern, şık UI yapmak zor. Windows/Mac/Linux'ta farklı görünüm. Animasyon, custom widget sınırlı. Büyük projeler: PyQt5/PySide6."
        }
      ],
      "fills": [
        {
          "code": "pencere = tk.<input class=\"blank\" data-ans=\"Tk\" placeholder=\"?\" style=\"width:30px\">()<span class=\"cm\">  # ana pencere</span>",
          "hint": "Ana pencere sınıfı"
        },
        {
          "code": "pencere.<input class=\"blank\" data-ans=\"title\" placeholder=\"?\" style=\"width:48px\">(<span class=\"st\">\"Uygulama\"</span>)",
          "hint": "Pencere başlığı"
        },
        {
          "code": "etiket = tk.<input class=\"blank\" data-ans=\"Label\" placeholder=\"?\" style=\"width:48px\">(pencere, text=<span class=\"st\">\"Hi\"</span>)",
          "hint": "Metin etiketi"
        },
        {
          "code": "etiket.<input class=\"blank\" data-ans=\"pack\" placeholder=\"?\" style=\"width:42px\">(pady=<span class=\"nm\">10</span>)<span class=\"cm\">  # yerleştir</span>",
          "hint": "Basit yerleştirme"
        },
        {
          "code": "pencere.<input class=\"blank\" data-ans=\"mainloop\" placeholder=\"?\" style=\"width:80px\">()<span class=\"cm\">  # olay döngüsü</span>",
          "hint": "Döngüyü başlat"
        }
      ],
      "drag": [
        {
          "code": "pencere = tk.<span class=\"hl\">___</span>()",
          "ans": "Tk",
          "opts": [
            "Tk",
            "Window",
            "Frame",
            "App",
            "Root"
          ],
          "exp": "tk.Tk() ana pencere — uygulama başlangıç noktası"
        },
        {
          "code": "tk.<span class=\"hl\">___</span>(pencere, text='Tamam', command=f)",
          "ans": "Button",
          "opts": [
            "Button",
            "Label",
            "Entry",
            "Frame",
            "Widget"
          ],
          "exp": "Button tıklanabilir buton — command ile callback bağlanır"
        },
        {
          "code": "giris = tk.<span class=\"hl\">___</span>(pencere, width=30)",
          "ans": "Entry",
          "opts": [
            "Entry",
            "Input",
            "TextField",
            "EditBox",
            "TextInput"
          ],
          "exp": "Entry tek satır metin giriş alanı"
        },
        {
          "code": "widget.<span class=\"hl\">___</span>(row=1, column=2)",
          "ans": "grid",
          "opts": [
            "grid",
            "pack",
            "place",
            "position",
            "layout"
          ],
          "exp": "grid() satır/sütun koordinatlı tablo yerleşimi"
        },
        {
          "code": "var = tk.<span class=\"hl\">___</span>(value='baslangic')",
          "ans": "StringVar",
          "opts": [
            "StringVar",
            "Variable",
            "TextVar",
            "StrVar",
            "ObsVar"
          ],
          "exp": "StringVar widget ile iki yönlü bağlantılı değişken"
        }
      ],
      "code": {
        "task": "Konsept olarak bir hesap makinesi GUI tasarla. tkinter kullanarak: Ekran (Entry), rakam butonları (1-9), operatör butonları (+,-,*,/), = butonu, temizle (C) butonu. Butonlar grid ile düzenlensin. (Kendi bilgisayarında çalıştır!)",
        "starter": "# Bu kodu kendi bilgisayarinda calistir: python3 hesap.py\nimport tkinter as tk\n\npencere = tk.Tk()\npencere.title('Hesap Makinesi')\npencere.geometry('280x320')\n\nekran_var = tk.StringVar(value='0')\nekran = tk.Entry(pencere, textvariable=ekran_var,\n                 width=20, font=('Arial', 18), justify='right')\nekran.grid(row=0, column=0, columnspan=4, padx=5, pady=5)\n\ndef tus_bas(tus):\n    mevcut = ekran_var.get()\n    if tus == 'C':\n        ekran_var.set('0')\n    elif tus == '=':\n        try:\n            sonuc = eval(mevcut)\n            ekran_var.set(str(sonuc))\n        except:\n            ekran_var.set('Hata')\n    else:\n        ekran_var.set('' if mevcut == '0' else mevcut + tus)\n        if mevcut == '0' and tus.isdigit():\n            ekran_var.set(tus)\n\ntuslar = [\n    ['7','8','9','/'],\n    ['4','5','6','*'],\n    ['1','2','3','-'],\n    ['C','0','=','+']\n]\nfor si, satir in enumerate(tuslar, 1):\n    for ci, tus in enumerate(satir):\n        tk.Button(pencere, text=tus, width=5, height=2,\n                  command=lambda t=tus: tus_bas(t)).grid(row=si, column=ci)\n\npencere.mainloop()",
        "checkFn": "(code)=>{const c=code;const p=(c.includes('tk.Tk')?2:0)+(c.includes('Entry')?2:0)+(c.includes('.grid(')?2:0)+(c.includes('command=')?2:0)+(c.includes('mainloop')?2:0);return{pts:Math.min(p,10),max:10,ok:p>=6,msg:p>=8?'GUI ustasi! 🖥️':p>=6?'Güzel tkinter!':'Tk(), Entry, grid, command ve mainloop kullan.'};",
        "hint": "tk.Tk() pencere aç. Entry ekran için. Button ile tuşlar. .grid(row, column) ile yerleştir. mainloop() en sona."
      }
    }
  },
  {
    "id": "pygame_temelleri",
    "icon": "🎮",
    "locked": true,
    "title": "pygame Temelleri",
    "desc": "Game loop, sprite, çarpışma, klavye — Python ile 2D oyun geliştir.",
    "phases": {
      "lesson": "<div class=\"lesson-text\">\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--purple)\"></div><h3>pygame — Oyun Geliştirmeye Giriş</h3></div>\n    <p>pygame Python için en popüler 2D oyun kütüphanesi. Grafik, ses, klavye/fare, fizik — hepsini sıfırdan kurman gerekmiyor. Birçok indie oyun, eğitim simülasyonu ve prototip pygame ile yapıldı. Game loop, event handling, sprite sistemi öğrenirsin — bu kavramlar her oyun motorunda var.</p>\n    <div class=\"box why\"><span class=\"box-icon\">🤔</span><span><strong>Neden pygame?</strong> Unity/Godot öğrenmek aylarca sürebilir. pygame ile Python bilginle hemen başlarsın. Flappy Bird klonu, Snake, Tetris, basit platformer — bunları birkaç günde yapabilirsin. Oyun geliştirmenin temel döngüsünü, fizik ve çarpışma mantığını burada anlarsın, sonra Godot'a geçmek çok daha kolay olur.</span></div>\n    <div class=\"box warn\"><span class=\"box-icon\">⚠️</span><span><strong>Skulpt'ta çalışmaz:</strong> pygame gerçek pencere açar, tarayıcı ortamıyla uyumsuz. Kodları kendi bilgisayarında çalıştır: <code>pip install pygame</code> sonra <code>python3 oyun.py</code>.</span></div>\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--blue)\"></div><h3>Game Loop — Her Oyunun Kalbi</h3></div>\n    <div class=\"code-block runnable\"><div class=\"cb-header\"><div class=\"cb-dots\"></div><span class=\"cb-label\">game_loop.py (kendi makinende)</span><span class=\"cb-run-tag\">▶</span></div><div class=\"cb-body\"><span class=\"kw\">import</span> pygame, sys<br><br>pygame.<span class=\"fn\">init</span>()<br>EKRAN = pygame.display.<span class=\"fn\">set_mode</span>((<span class=\"nm\">800</span>, <span class=\"nm\">600</span>))<br>pygame.display.<span class=\"fn\">set_caption</span>(<span class=\"st\">\"İlk Oyun\"</span>)<br>saat = pygame.time.<span class=\"fn\">Clock</span>()<br><br><span class=\"cm\"># Renkler</span><br>BEYAZ = (<span class=\"nm\">255</span>,<span class=\"nm\">255</span>,<span class=\"nm\">255</span>)<br>MAVI = (<span class=\"nm\">50</span>,<span class=\"nm\">120</span>,<span class=\"nm\">220</span>)<br>SİYAH = (<span class=\"nm\">0</span>,<span class=\"nm\">0</span>,<span class=\"nm\">0</span>)<br><br><span class=\"cm\"># Oyuncu</span><br>x, y = <span class=\"nm\">400</span>, <span class=\"nm\">300</span><br>HIZ = <span class=\"nm\">5</span><br><br><span class=\"kw\">while</span> <span class=\"kw\">True</span>:<span class=\"cm\">  # Game loop</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"cm\"># 1. Olayları işle</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">for</span> olay <span class=\"kw\">in</span> pygame.event.<span class=\"fn\">get</span>():<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">if</span> olay.<span class=\"fn\">type</span> == pygame.<span class=\"fn\">QUIT</span>: sys.<span class=\"fn\">exit</span>()<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"cm\"># 2. Oyun mantığı</span><br>&nbsp;&nbsp;&nbsp;&nbsp;tuslar = pygame.key.<span class=\"fn\">get_pressed</span>()<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">if</span> tuslar[pygame.<span class=\"fn\">K_LEFT</span>]: x -= HIZ<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">if</span> tuslar[pygame.<span class=\"fn\">K_RIGHT</span>]: x += HIZ<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">if</span> tuslar[pygame.<span class=\"fn\">K_UP</span>]: y -= HIZ<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">if</span> tuslar[pygame.<span class=\"fn\">K_DOWN</span>]: y += HIZ<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"cm\"># 3. Çiz</span><br>&nbsp;&nbsp;&nbsp;&nbsp;EKRAN.<span class=\"fn\">fill</span>(SİYAH)<br>&nbsp;&nbsp;&nbsp;&nbsp;pygame.draw.<span class=\"fn\">rect</span>(EKRAN, MAVI, (x, y, <span class=\"nm\">50</span>, <span class=\"nm\">50</span>))<br>&nbsp;&nbsp;&nbsp;&nbsp;pygame.display.<span class=\"fn\">flip</span>()<br>&nbsp;&nbsp;&nbsp;&nbsp;saat.<span class=\"fn\">tick</span>(<span class=\"nm\">60</span>)<span class=\"cm\">  # 60 FPS</span></div><textarea class=\"cb-src\" style=\"display:none\"># pip install pygame\nimport pygame, sys\npygame.init()\nEKRAN = pygame.display.set_mode((800, 600))\npygame.display.set_caption(\"Ilk Oyun\")\nsaat = pygame.time.Clock()\nBEYAZ = (255,255,255); MAVI = (50,120,220); SIYAH = (0,0,0)\nx, y = 400, 300; HIZ = 5\nwhile True:\n    for olay in pygame.event.get():\n        if olay.type == pygame.QUIT: sys.exit()\n    tuslar = pygame.key.get_pressed()\n    if tuslar[pygame.K_LEFT]: x -= HIZ\n    if tuslar[pygame.K_RIGHT]: x += HIZ\n    if tuslar[pygame.K_UP]: y -= HIZ\n    if tuslar[pygame.K_DOWN]: y += HIZ\n    x = max(0, min(x, 750)); y = max(0, min(y, 550))\n    EKRAN.fill(SIYAH)\n    pygame.draw.rect(EKRAN, MAVI, (x, y, 50, 50))\n    pygame.display.flip()\n    saat.tick(60)</textarea></div>\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--green)\"></div><h3>Sprite Sınıfı — Nesne Odaklı Oyun</h3></div>\n    <div class=\"code-block runnable\"><div class=\"cb-header\"><div class=\"cb-dots\"></div><span class=\"cb-label\">sprite.py (kendi makinende)</span><span class=\"cb-run-tag\">▶</span></div><div class=\"cb-body\"><span class=\"kw\">import</span> pygame<br><br><span class=\"kw\">class</span> <span class=\"fn\">Oyuncu</span>(pygame.<span class=\"fn\">sprite</span>.<span class=\"fn\">Sprite</span>):<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">def</span> <span class=\"fn\">__init__</span>(<span class=\"kw\">self</span>):<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"fn\">super</span>().__init__()<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">self</span>.image = pygame.<span class=\"fn\">Surface</span>((<span class=\"nm\">50</span>,<span class=\"nm\">50</span>))<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">self</span>.image.<span class=\"fn\">fill</span>((<span class=\"nm\">0</span>,<span class=\"nm\">120</span>,<span class=\"nm\">255</span>))<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">self</span>.rect = <span class=\"kw\">self</span>.image.<span class=\"fn\">get_rect</span>()<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">self</span>.rect.<span class=\"fn\">center</span> = (<span class=\"nm\">400</span>, <span class=\"nm\">300</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">self</span>.hiz_x = <span class=\"kw\">self</span>.hiz_y = <span class=\"nm\">0</span><br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">def</span> <span class=\"fn\">update</span>(<span class=\"kw\">self</span>):<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;tuslar = pygame.key.<span class=\"fn\">get_pressed</span>()<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">self</span>.hiz_x = (tuslar[pygame.<span class=\"fn\">K_RIGHT</span>] - tuslar[pygame.<span class=\"fn\">K_LEFT</span>]) * <span class=\"nm\">5</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">self</span>.hiz_y = (tuslar[pygame.<span class=\"fn\">K_DOWN</span>] - tuslar[pygame.<span class=\"fn\">K_UP</span>]) * <span class=\"nm\">5</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">self</span>.rect.x += <span class=\"kw\">self</span>.hiz_x<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">self</span>.rect.y += <span class=\"kw\">self</span>.hiz_y<br><br><span class=\"kw\">class</span> <span class=\"fn\">Dusman</span>(pygame.<span class=\"fn\">sprite</span>.<span class=\"fn\">Sprite</span>):<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">def</span> <span class=\"fn\">__init__</span>(<span class=\"kw\">self</span>, x, y):<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"fn\">super</span>().__init__()<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">self</span>.image = pygame.<span class=\"fn\">Surface</span>((<span class=\"nm\">40</span>,<span class=\"nm\">40</span>))<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">self</span>.image.<span class=\"fn\">fill</span>((<span class=\"nm\">220</span>,<span class=\"nm\">50</span>,<span class=\"nm\">50</span>))<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">self</span>.rect = <span class=\"kw\">self</span>.image.<span class=\"fn\">get_rect</span>(center=(x, y))</div><textarea class=\"cb-src\" style=\"display:none\">import pygame\nclass Oyuncu(pygame.sprite.Sprite):\n    def __init__(self):\n        super().__init__()\n        self.image = pygame.Surface((50,50))\n        self.image.fill((0,120,255))\n        self.rect = self.image.get_rect(center=(400,300))\n    def update(self):\n        tuslar = pygame.key.get_pressed()\n        self.rect.x += (tuslar[pygame.K_RIGHT]-tuslar[pygame.K_LEFT])*5\n        self.rect.y += (tuslar[pygame.K_DOWN]-tuslar[pygame.K_UP])*5\nclass Dusman(pygame.sprite.Sprite):\n    def __init__(self, x, y):\n        super().__init__()\n        self.image = pygame.Surface((40,40))\n        self.image.fill((220,50,50))\n        self.rect = self.image.get_rect(center=(x,y))\npygame.init()\nekran = pygame.display.set_mode((800,600))\noyuncu = Oyuncu()\ndusmanlar = pygame.sprite.Group([Dusman(200,200), Dusman(600,400)])\ntum_sprite = pygame.sprite.Group([oyuncu])\ntum_sprite.add(dusmanlar)\nsaat = pygame.time.Clock()\nimport sys\nwhile True:\n    for e in pygame.event.get():\n        if e.type == pygame.QUIT: sys.exit()\n    tum_sprite.update()\n    if pygame.sprite.spritecollideany(oyuncu, dusmanlar):\n        print(\"Carpisti!\")\n    ekran.fill((0,0,0))\n    tum_sprite.draw(ekran)\n    pygame.display.flip()\n    saat.tick(60)</textarea></div>\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--amber)\"></div><h3>Çarpışma ve Ses</h3></div>\n    <div class=\"code-block runnable\"><div class=\"cb-header\"><div class=\"cb-dots\"></div><span class=\"cb-label\">carpisme.py</span><span class=\"cb-run-tag\">▶</span></div><div class=\"cb-body\"><span class=\"cm\"># Çarpışma tespiti</span><br><span class=\"cm\"># Rect.colliderect — iki dikdörtgen çarpıştı mı?</span><br>oyuncu_rect = pygame.<span class=\"fn\">Rect</span>(<span class=\"nm\">100</span>, <span class=\"nm\">100</span>, <span class=\"nm\">50</span>, <span class=\"nm\">50</span>)<br>dusman_rect = pygame.<span class=\"fn\">Rect</span>(<span class=\"nm\">130</span>, <span class=\"nm\">120</span>, <span class=\"nm\">40</span>, <span class=\"nm\">40</span>)<br><span class=\"fn\">print</span>(oyuncu_rect.<span class=\"fn\">colliderect</span>(dusman_rect))&nbsp;<span class=\"cm\"># True</span><br><br><span class=\"cm\"># spritecollideany — grup ile çarpışma</span><br><span class=\"cm\"># if pygame.sprite.spritecollideany(oyuncu, dusmanlar):</span><br><span class=\"cm\">#     can -= 1; oyuncu.rect.center = (400, 300)</span><br><br><span class=\"cm\"># Ses (WAV/OGG dosyası gerekir)</span><br><span class=\"cm\"># pygame.mixer.init()</span><br><span class=\"cm\"># ses = pygame.mixer.Sound('patlama.wav')</span><br><span class=\"cm\"># ses.play()</span><br><br><span class=\"cm\"># Metin yazdırma</span><br><span class=\"cm\"># font = pygame.font.Font(None, 36)</span><br><span class=\"cm\"># yazi = font.render(f'Puan: {puan}', True, (255,255,255))</span><br><span class=\"cm\"># ekran.blit(yazi, (10, 10))</span></div><textarea class=\"cb-src\" style=\"display:none\">import pygame\n# Carpisme ornekleri\nr1 = pygame.Rect(100, 100, 50, 50)\nr2 = pygame.Rect(130, 120, 40, 40)\nprint(\"Carpisti:\", r1.colliderect(r2))\nr3 = pygame.Rect(300, 300, 50, 50)\nprint(\"Uzak:\", r1.colliderect(r3))\n\n# Point inside rect?\nprint(\"Nokta icinde:\", r1.collidepoint(110, 110))\n\n# Rect metodlari\nprint(\"Merkez:\", r1.center)\nprint(\"Sol-ust:\", r1.topleft)\nprint(\"Alan:\", r1.width * r1.height)</textarea></div>\n    <div class=\"box deep\"><span class=\"box-icon\">🧠</span><span><strong>Game loop 3 aşaması her karede tekrar eder:</strong> 1) Input: pygame.event.get() + key.get_pressed(). 2) Update: pozisyon güncelle, çarpışma kontrol et, fizik hesapla, skor güncelle. 3) Render: fill (temizle) → draw → display.flip (ekrana gönder). Clock.tick(60) hızı 60 FPS ile sınırlar.</span></div>\n    <div class=\"box alt\"><span class=\"box-icon\">⚖️</span><span><strong>pygame sonrası ne?</strong> Godot Engine (GDScript/Python benzeri, 2D+3D, açık kaynak). Unity (C#, profesyonel, geniş ekosistem). Unreal Engine (C++, foto-gerçekçi grafik). pygame'deki game loop, sprite, fizik, event kavramları hepsinde geçerli.</span></div>\n    <div class=\"lesson-nav\"><button class=\"nav-btn go\" onclick=\"switchPhase(1)\">🧠 Teste Geç →</button></div>\n  </div>",
      "quiz": [
        {
          "q": "Game loop'un 3 temel aşaması nedir?",
          "opts": [
            "Init, Run, Stop",
            "Input al → Güncelle → Çiz — her frame tekrar eder",
            "Load, Play, Save",
            "Setup, Loop, End"
          ],
          "ans": 1,
          "exp": "Her frame: 1) Olayları işle (quit, tuş, mouse). 2) Mantığı güncelle (pozisyon, çarpışma, fizik). 3) Ekranı çiz (fill → draw → flip). Clock.tick(60) saniyede 60 kez döner."
        },
        {
          "q": "display.flip() ne yapar?",
          "opts": [
            "Oyunu kapatır",
            "Arka tamponu ön tampona kopyalar — tüm çizimler bir anda ekranda görünür",
            "Ekranı temizler",
            "FPS ayarlar"
          ],
          "ans": 1,
          "exp": "Double buffering: tüm çizimler arka tampona yapılır (görünmez). flip() arka tamponu ön (görünen) tampona geçirir. Titremeyi önler. update() kısmi güncelleme alternatifi."
        },
        {
          "q": "pygame.sprite.Sprite kullanmanın avantajı?",
          "opts": [
            "Daha hızlı",
            "Group sistemi — draw, update, çarpışma tespiti tek komutla",
            "Zorunlu",
            "Daha az kod"
          ],
          "ans": 1,
          "exp": "Sprite: image + rect. Group: tüm sprite'ların update() ve draw() metodlarını otomatik çağırır. spritecollideany/spritecollide ile grup bazlı çarpışma tespiti. OOP ile düzenli oyun kodu."
        },
        {
          "q": "Clock.tick(60) ne garanti eder?",
          "opts": [
            "60 saniye oyun",
            "Oyunun 60 FPS'den fazla çalışmaması — sabit hız garantisi",
            "60 düşman",
            "Ses 60Hz"
          ],
          "ans": 1,
          "exp": "tick(60): frame süre 16.7ms'den kısa olursa bekler. Güçlü bilgisayarda 600 FPS olmasını önler. Tüm makinelerde aynı oyun hızı. Daha iyi yöntem: delta time ile fizik güncelle."
        },
        {
          "q": "Rect.colliderect() ne döner?",
          "opts": [
            "Çarpışma noktası",
            "Bool — iki dikdörtgen örtüşüyorsa True",
            "Mesafe",
            "Çarpışma alanı"
          ],
          "ans": 1,
          "exp": "colliderect(diger_rect): çakışan pixel varsa True. Basit AABB (Axis-Aligned Bounding Box) çarpışma tespiti. Daire için pygame.math.Vector2.distance_to() kullanılır."
        }
      ],
      "fills": [
        {
          "code": "pygame.<input class=\"blank\" data-ans=\"init\" placeholder=\"?\" style=\"width:42px\">()<span class=\"cm\">  # pygame başlat</span>",
          "hint": "Başlatma fonksiyonu"
        },
        {
          "code": "EKRAN = pygame.display.<input class=\"blank\" data-ans=\"set_mode\" placeholder=\"?\" style=\"width:78px\">((<span class=\"nm\">800</span>, <span class=\"nm\">600</span>))",
          "hint": "Pencere oluştur"
        },
        {
          "code": "saat = pygame.time.<input class=\"blank\" data-ans=\"Clock\" placeholder=\"?\" style=\"width:52px\">()<span class=\"cm\">  # FPS kontrolü</span>",
          "hint": "Saat sınıfı"
        },
        {
          "code": "EKRAN.<input class=\"blank\" data-ans=\"fill\" placeholder=\"?\" style=\"width:42px\">(SIYAH)<span class=\"cm\">  # ekranı temizle</span>",
          "hint": "Doldur/temizle"
        },
        {
          "code": "pygame.display.<input class=\"blank\" data-ans=\"flip\" placeholder=\"?\" style=\"width:42px\">()<span class=\"cm\">  # göster</span>",
          "hint": "Ekrana gönder"
        }
      ],
      "drag": [
        {
          "code": "for olay in pygame.event.<span class=\"hl\">___</span>():",
          "ans": "get",
          "opts": [
            "get",
            "poll",
            "read",
            "fetch",
            "listen"
          ],
          "exp": "event.get() bu frame'deki tüm olayları döner"
        },
        {
          "code": "tuslar = pygame.key.<span class=\"hl\">___</span>()",
          "ans": "get_pressed",
          "opts": [
            "get_pressed",
            "get",
            "read",
            "poll",
            "state"
          ],
          "exp": "get_pressed(): basılı tüm tuşların boolean dizisi"
        },
        {
          "code": "pygame.draw.<span class=\"hl\">___</span>(ekran, renk, rect)",
          "ans": "rect",
          "opts": [
            "rect",
            "circle",
            "line",
            "polygon",
            "ellipse"
          ],
          "exp": "draw.rect() dikdörtgen çizer — (x, y, w, h) formatında"
        },
        {
          "code": "saat.<span class=\"hl\">___</span>(60)  # 60 FPS sınırla",
          "ans": "tick",
          "opts": [
            "tick",
            "set",
            "limit",
            "cap",
            "fps"
          ],
          "exp": "tick(60) frame hızını 60 FPS ile sınırlar"
        },
        {
          "code": "if r1.<span class=\"hl\">___</span>(r2):  # çarpıştı mı?",
          "ans": "colliderect",
          "opts": [
            "colliderect",
            "collide",
            "intersect",
            "overlap",
            "touch"
          ],
          "exp": "colliderect() iki dikdörtgenin çakışıp çakışmadığını kontrol eder"
        }
      ],
      "code": {
        "task": "pygame kullanmadan yalnızca Python ile mini bir oyun simülasyonu yaz: Oyuncu (x,y) ve düşman (ex,ey) koordinatları var. Her turda oyuncu rastgele 1 birim hareket eder. Mesafe < 5 ise 'Çarpışma!' yaz. 10 tur simüle et.",
        "starter": "import random\nimport math\n\nclass Oyuncu:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n    \n    def hareket(self):\n        self.x += random.choice([-1, 0, 1])\n        self.y += random.choice([-1, 0, 1])\n    \n    def mesafe(self, diger):\n        return math.sqrt((self.x - diger.x)**2 + (self.y - diger.y)**2)\n\noyuncu = Oyuncu(0, 0)\ndusman = Oyuncu(5, 5)\n\nfor tur in range(10):\n    oyuncu.hareket()\n    mesafe = oyuncu.mesafe(dusman)\n    durum = 'CARPISME!' if mesafe < 5 else 'Guven'\n    print(f'Tur {tur+1}: Oyuncu({oyuncu.x},{oyuncu.y}) Mesafe={mesafe:.1f} {durum}')",
        "checkFn": "(code)=>{const c=code;const p=(c.includes('class')?2:0)+(c.includes('random')?2:0)+(c.includes('math.sqrt')||c.includes('mesafe')?2:0)+(c.includes('for')?2:0)+((c.match(/print/g)||[]).length>=1?2:0);return{pts:Math.min(p,10),max:10,ok:p>=6,msg:p>=8?'Oyun ustasi! 🎮':p>=6?'Güzel simülasyon!':'class, random, mesafe hesaplama ve döngü kullan.'};",
        "hint": "Oyuncu sınıfı, random.choice([-1,0,1]) hareket, math.sqrt ile mesafe, if mesafe < 5 çarpışma kontrolü."
      }
    }
  },
  {
    "id": "generators_itertools",
    "icon": "🔄",
    "locked": true,
    "title": "Generatörler & itertools İleri",
    "desc": "yield, generator expression, islice, chain, combinations, groupby — bellek dostu akışlar.",
    "phases": {
      "lesson": "<div class=\"lesson-text\">\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--purple)\"></div><h3>Generatörler & itertools — Sonsuz Akışlarla Çalış</h3></div>\n    <p>1 milyon sayıyı listeye koyarsan 8 MB bellek harcarsın. Generatör ile aynı 1 milyonu tek tek üretirsen bellek sabittir — ne kadar büyük veri olursa olsun. <code>itertools</code> ise bu akışlar üzerinde kombinasyon, permütasyon, gruplama ve daha fazlasını sağlar.</p>\n    <div class=\"box why\"><span class=\"box-icon\">🤔</span><span><strong>Neden generatör?</strong> Büyük log dosyasını satır satır işlemek, sonsuz sayı dizisi üretmek, pipeline oluşturmak, lazy evaluation — bellek verimliliği ve performans. Python'un en güçlü özelliklerinden biri. range() zaten bir generatör — hiç düşündün mü?</span></div>\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--blue)\"></div><h3>yield ve Generator Expression</h3></div>\n    <div class=\"code-block runnable\"><div class=\"cb-header\"><div class=\"cb-dots\"></div><span class=\"cb-label\">generator.py</span><span class=\"cb-run-tag\">▶</span></div><div class=\"cb-body\"><span class=\"cm\"># Normal fonksiyon vs generatör</span><br><span class=\"kw\">def</span> <span class=\"fn\">kare_listesi</span>(n):<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">return</span> [i*i <span class=\"kw\">for</span> i <span class=\"kw\">in</span> <span class=\"fn\">range</span>(n)]<span class=\"cm\">  # hepsi belleğe</span><br><br><span class=\"kw\">def</span> <span class=\"fn\">kare_gen</span>(n):<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">for</span> i <span class=\"kw\">in</span> <span class=\"fn\">range</span>(n):<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">yield</span> i * i<span class=\"cm\">  # tek tek üret</span><br><br><span class=\"cm\"># Generator expression (list comp gibi ama ())</span><br>gen = (i*i <span class=\"kw\">for</span> i <span class=\"kw\">in</span> <span class=\"fn\">range</span>(<span class=\"nm\">10</span>))<br><span class=\"fn\">print</span>(<span class=\"fn\">next</span>(gen))&nbsp;&nbsp;<span class=\"cm\"># 0</span><br><span class=\"fn\">print</span>(<span class=\"fn\">next</span>(gen))&nbsp;&nbsp;<span class=\"cm\"># 1</span><br><span class=\"fn\">print</span>(<span class=\"fn\">next</span>(gen))&nbsp;&nbsp;<span class=\"cm\"># 4</span><br><br><span class=\"cm\"># sum() direkt generatörü tüketir</span><br><span class=\"fn\">print</span>(<span class=\"fn\">sum</span>(kare_gen(<span class=\"nm\">1000000</span>)))&nbsp;<span class=\"cm\"># az bellek!</span></div><textarea class=\"cb-src\" style=\"display:none\">def kare_listesi(n):\n    return [i*i for i in range(n)]\ndef kare_gen(n):\n    for i in range(n):\n        yield i * i\ngen = (i*i for i in range(10))\nprint(next(gen))\nprint(next(gen))\nprint(next(gen))\nprint(list(kare_gen(10)))\nprint(sum(kare_gen(100)))</textarea></div>\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--green)\"></div><h3>Sonsuz Generatörler</h3></div>\n    <div class=\"code-block runnable\"><div class=\"cb-header\"><div class=\"cb-dots\"></div><span class=\"cb-label\">sonsuz_gen.py</span><span class=\"cb-run-tag\">▶</span></div><div class=\"cb-body\"><span class=\"kw\">def</span> <span class=\"fn\">fibonacci</span>():<br>&nbsp;&nbsp;&nbsp;&nbsp;a, b = <span class=\"nm\">0</span>, <span class=\"nm\">1</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">while</span> <span class=\"kw\">True</span>:<span class=\"cm\">  # sonsuz!</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">yield</span> a<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a, b = b, a + b<br><br><span class=\"kw\">def</span> <span class=\"fn\">al</span>(n, gen):<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">for</span> _ <span class=\"kw\">in</span> <span class=\"fn\">range</span>(n):<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">yield</span> <span class=\"fn\">next</span>(gen)<br><br><span class=\"cm\"># İlk 10 fibonacci</span><br><span class=\"fn\">print</span>(<span class=\"fn\">list</span>(<span class=\"fn\">al</span>(<span class=\"nm\">10</span>, <span class=\"fn\">fibonacci</span>())))<br><br><span class=\"cm\"># itertools.islice ile daha temiz</span><br><span class=\"kw\">from</span> itertools <span class=\"kw\">import</span> islice<br><span class=\"fn\">print</span>(<span class=\"fn\">list</span>(<span class=\"fn\">islice</span>(<span class=\"fn\">fibonacci</span>(), <span class=\"nm\">10</span>)))<br><br><span class=\"cm\"># itertools.count — sonsuz sayaç</span><br><span class=\"kw\">from</span> itertools <span class=\"kw\">import</span> count<br>cift = (n <span class=\"kw\">for</span> n <span class=\"kw\">in</span> <span class=\"fn\">count</span>() <span class=\"kw\">if</span> n % <span class=\"nm\">2</span> == <span class=\"nm\">0</span>)<br><span class=\"fn\">print</span>(<span class=\"fn\">list</span>(<span class=\"fn\">islice</span>(cift, <span class=\"nm\">5</span>)))<span class=\"cm\">  # [0,2,4,6,8]</span></div><textarea class=\"cb-src\" style=\"display:none\">from itertools import islice, count\ndef fibonacci():\n    a, b = 0, 1\n    while True:\n        yield a\n        a, b = b, a + b\nprint(list(islice(fibonacci(), 10)))\ncift = (n for n in count() if n % 2 == 0)\nprint(list(islice(cift, 5)))</textarea></div>\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--amber)\"></div><h3>itertools — Kombinatorik ve Gruplama</h3></div>\n    <div class=\"code-block runnable\"><div class=\"cb-header\"><div class=\"cb-dots\"></div><span class=\"cb-label\">itertools_ornek.py</span><span class=\"cb-run-tag\">▶</span></div><div class=\"cb-body\"><span class=\"kw\">from</span> itertools <span class=\"kw\">import</span> (<br>&nbsp;&nbsp;&nbsp;&nbsp;chain, groupby, combinations, permutations,<br>&nbsp;&nbsp;&nbsp;&nbsp;product, accumulate<br>)<br><br><span class=\"cm\"># chain — birden fazla iterable birleştir</span><br>tum = <span class=\"fn\">list</span>(<span class=\"fn\">chain</span>([<span class=\"nm\">1</span>,<span class=\"nm\">2</span>], [<span class=\"nm\">3</span>,<span class=\"nm\">4</span>], [<span class=\"nm\">5</span>]))<br><span class=\"fn\">print</span>(tum)&nbsp;<span class=\"cm\"># [1,2,3,4,5]</span><br><br><span class=\"cm\"># combinations — kombinasyon</span><br>kombin = <span class=\"fn\">list</span>(<span class=\"fn\">combinations</span>([<span class=\"st\">\"A\"</span>,<span class=\"st\">\"B\"</span>,<span class=\"st\">\"C\"</span>], <span class=\"nm\">2</span>))<br><span class=\"fn\">print</span>(kombin)&nbsp;<span class=\"cm\"># [('A','B'),('A','C'),('B','C')]</span><br><br><span class=\"cm\"># groupby — art arda aynı değerleri grupla</span><br>veri = [<span class=\"nm\">1</span>,<span class=\"nm\">1</span>,<span class=\"nm\">2</span>,<span class=\"nm\">2</span>,<span class=\"nm\">2</span>,<span class=\"nm\">3</span>]<br><span class=\"kw\">for</span> anahtar, grup <span class=\"kw\">in</span> <span class=\"fn\">groupby</span>(veri):<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"fn\">print</span>(<span class=\"st\">f\"{anahtar}: {list(grup)}\"</span>)<br><br><span class=\"cm\"># accumulate — kümülatif toplam</span><br>fiyatlar = [<span class=\"nm\">100</span>, <span class=\"nm\">200</span>, <span class=\"nm\">150</span>, <span class=\"nm\">300</span>]<br><span class=\"fn\">print</span>(<span class=\"fn\">list</span>(<span class=\"fn\">accumulate</span>(fiyatlar)))&nbsp;<span class=\"cm\"># [100,300,450,750]</span></div><textarea class=\"cb-src\" style=\"display:none\">from itertools import chain, groupby, combinations, permutations, accumulate\ntum = list(chain([1,2],[3,4],[5]))\nprint(\"chain:\", tum)\nkombin = list(combinations([\"A\",\"B\",\"C\"], 2))\nprint(\"combinations:\", kombin)\nperm = list(permutations([\"A\",\"B\",\"C\"], 2))\nprint(\"permutations:\", perm)\nveri = [1,1,2,2,2,3]\nfor k, g in groupby(veri):\n    print(f\"{k}: {list(g)}\")\nfiyatlar = [100,200,150,300]\nprint(\"accumulate:\", list(accumulate(fiyatlar)))</textarea></div>\n    <div class=\"box tip\"><span class=\"box-icon\">💡</span><span><strong>Hangi itertools'u ne zaman?</strong> chain: iki listeyi birleştir. combinations: sırasız seçim (poker eli). permutations: sıralı seçim (şifre denemeleri). product: kartezyen çarpım (tüm kombinasyonlar). groupby: aynı değerleri grupla. islice: sonsuz generatörden N eleman al.</span></div>\n    <div class=\"box deep\"><span class=\"box-icon\">🧠</span><span><strong>Pipeline mimarisi:</strong> <code>sum(x*x for x in filter(lambda n: n%2==0, range(1000)))</code> — tüm liste oluşturulmaz, tek tek akış. Büyük veri işlemede bellek sabit. MapReduce'un Python versiyonu. functools.reduce ile de birleştirilir.</span></div>\n    <div class=\"lesson-nav\"><button class=\"nav-btn go\" onclick=\"switchPhase(1)\">🧠 Teste Geç →</button></div>\n  </div>",
      "quiz": [
        {
          "q": "Generatör ile liste arasındaki temel fark nedir?",
          "opts": [
            "Generatör daha hızlı",
            "Generatör elemanları tek tek üretir, belleğe tümünü almaz — sonsuz diziler mümkün",
            "Generatör sıralı",
            "Liste daha iyi"
          ],
          "ans": 1,
          "exp": "Liste: tüm elemanlar belleğe alınır. 1M elemanlı liste ~8MB. Generatör: talep geldikçe üretir, bellek sabit. Sonsuz dizi, büyük dosya satırları, lazy evaluation için ideal."
        },
        {
          "q": "yield ile return farkı nedir?",
          "opts": [
            "Aynı şey",
            "yield değer üretir ve fonksiyon duraklatılır, bir sonraki next() çağrısında devam eder",
            "yield döner",
            "return bekler"
          ],
          "ans": 1,
          "exp": "return: fonksiyon biter. yield: değer döner, fonksiyon o noktada duraklatılır. next() çağrılınca kaldığı yerden devam eder. Local değişkenler korunur."
        },
        {
          "q": "itertools.islice neden gerekli?",
          "opts": [
            "Sıralama için",
            "Sonsuz generatörden belirli sayıda eleman almak için — list() ile sonsuz generatör bitmez",
            "Hız için",
            "Filter için"
          ],
          "ans": 1,
          "exp": "list(fibonacci()) asla bitmez — sonsuz döngü. islice(fibonacci(), 10): sadece ilk 10'u alır ve durur. Sonsuz generatörlerle çalışmanın temel aracı."
        },
        {
          "q": "itertools.combinations ile permutations farkı?",
          "opts": [
            "Aynı",
            "combinations: sıra önemli değil — (A,B)=(B,A). permutations: sıra farklı — (A,B)≠(B,A)",
            "combinations daha yavaş",
            "permutations büyük"
          ],
          "ans": 1,
          "exp": "combinations(3 kişi, 2): AB, AC, BC — sırasız, 3 sonuç. permutations(3 kişi, 2): AB, AC, BA, BC, CA, CB — sıralı, 6 sonuç. Poker eli combinations, şifre denemeleri permutations."
        },
        {
          "q": "generator expression'ın list comprehension'dan farkı?",
          "opts": [
            "Sadece parantez",
            "[] yerine () — hepsi değil tek tek üretir, bellek verimlisi",
            "Daha yavaş",
            "Farksız"
          ],
          "ans": 1,
          "exp": "[i*i for i in range(10)] → list, tüm 10 eleman belleğe. (i*i for i in range(10)) → generator, talep geldikçe. sum() ve for döngüleri doğrudan generator tüketir."
        }
      ],
      "fills": [
        {
          "code": "&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">yield</span> <input class=\"blank\" data-ans=\"i * i\" placeholder=\"?\" style=\"width:52px\"><span class=\"cm\">  # değer üret, dur</span>",
          "hint": "Üretilen değer"
        },
        {
          "code": "gen = (<input class=\"blank\" data-ans=\"i*i\" placeholder=\"?\" style=\"width:40px\"> <span class=\"kw\">for</span> i <span class=\"kw\">in</span> <span class=\"fn\">range</span>(<span class=\"nm\">10</span>))",
          "hint": "Generator expression"
        },
        {
          "code": "<span class=\"fn\">print</span>(<span class=\"fn\">next</span>(<input class=\"blank\" data-ans=\"gen\" placeholder=\"?\" style=\"width:38px\">))<span class=\"cm\">  # sonraki üret</span>",
          "hint": "Generator değişkeni"
        },
        {
          "code": "<span class=\"kw\">from</span> itertools <span class=\"kw\">import</span> <input class=\"blank\" data-ans=\"islice\" placeholder=\"?\" style=\"width:58px\">",
          "hint": "Kesit alma fonksiyonu"
        },
        {
          "code": "<span class=\"fn\">print</span>(<span class=\"fn\">list</span>(<span class=\"fn\">islice</span>(<span class=\"fn\">fibonacci</span>(), <input class=\"blank\" data-ans=\"10\" placeholder=\"?\" style=\"width:30px\">)))",
          "hint": "Kaç eleman alınacak"
        }
      ],
      "drag": [
        {
          "code": "def gen():<br>    <span class=\"hl\">___</span> deger  # üret ve dur",
          "ans": "yield",
          "opts": [
            "yield",
            "return",
            "emit",
            "produce",
            "send"
          ],
          "exp": "yield değer üretir ve generatörü duraklatır"
        },
        {
          "code": "from itertools import <span class=\"hl\">___</span>  # kesit al",
          "ans": "islice",
          "opts": [
            "islice",
            "slice",
            "take",
            "limit",
            "head"
          ],
          "exp": "islice(gen, n) sonsuz generatörden n eleman alır"
        },
        {
          "code": "from itertools import <span class=\"hl\">___</span>  # birleştir",
          "ans": "chain",
          "opts": [
            "chain",
            "merge",
            "join",
            "concat",
            "link"
          ],
          "exp": "chain birden fazla iterable'ı sırayla birleştirir"
        },
        {
          "code": "from itertools import <span class=\"hl\">___</span>  # sırasız seçim",
          "ans": "combinations",
          "opts": [
            "combinations",
            "permutations",
            "product",
            "choose",
            "select"
          ],
          "exp": "combinations(dizi, r) r'li sırasız kombinasyonlar üretir"
        },
        {
          "code": "from itertools import <span class=\"hl\">___</span>  # kümülatif",
          "ans": "accumulate",
          "opts": [
            "accumulate",
            "cumsum",
            "running",
            "total",
            "fold"
          ],
          "exp": "accumulate kümülatif toplamları üretir — [100, 300, 450, ...]"
        }
      ],
      "code": {
        "task": "Sonsuz asal sayı generatörü yaz. is_prime(n) fonksiyonu ile bir sayının asal olup olmadığını kontrol et. asal_sayilar() generatörü sonsuz asal üretsin. islice ile ilk 15 asalı al ve yazdır.",
        "starter": "from itertools import islice, count\n\ndef is_prime(n):\n    if n < 2: return False\n    for i in range(2, int(n**0.5) + 1):\n        if n % i == 0: return False\n    return True\n\ndef asal_sayilar():\n    for n in count(2):  # 2'den sonsuzluğa\n        if is_prime(n):\n            yield n\n\nilk_15 = list(islice(asal_sayilar(), 15))\nprint('Ilk 15 asal:', ilk_15)\nprint('Toplam:', sum(ilk_15))\nprint('En buyuk:', max(ilk_15))",
        "checkFn": "(code)=>{const c=code;const p=(c.includes('yield')?3:0)+(c.includes('islice')?2:0)+(c.includes('is_prime')||c.includes('asal')?2:0)+(c.includes('count')||c.includes('while True')?1:0)+((c.match(/print/g)||[]).length>=2?2:0);return{pts:Math.min(p,10),max:10,ok:p>=6,msg:p>=8?'Generator ustasi! 🔄':p>=6?'Güzel generator!':'yield, islice ve sonsuz döngü kullan.'};",
        "hint": "def asal_sayilar(): içinde while True: veya count() ile sonsuz dön, is_prime kontrolü geçenler için yield. Dışarıda islice(gen, 15) ile al."
      }
    }
  },
  {
    "id": "final_proje",
    "icon": "🏆",
    "locked": true,
    "title": "Final Proje: Görev Yöneticisi",
    "desc": "SQLite, logging, unittest, regex, JSON — M8'in tüm konularını birleştiren kapsamlı proje.",
    "phases": {
      "lesson": "<div class=\"lesson-text\">\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--purple)\"></div><h3>Final Proje — Kişisel Görev Yöneticisi</h3></div>\n    <p>M8'te öğrendiğin her şeyi bir arada kullandığın büyük proje: <strong>Kişisel Görev Yöneticisi</strong>. SQLite veritabanı, JSON import/export, loglama, istatistik analizi, regex ile arama ve unittest ile testler — hepsi gerçek bir uygulamada bir araya geliyor.</p>\n    <div class=\"box why\"><span class=\"box-icon\">🤔</span><span><strong>Neden büyük proje?</strong> Her derste küçük parçalar gördün. Ama gerçek yazılım geliştirme bunları <em>birleştirmekten</em> ibaret. Proje: mimari karar verme, modülleri uyumlu çalıştırma, hata yönetimi, test etme. Bu beceriler portföyünde gösterilebilir.</span></div>\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--blue)\"></div><h3>Proje Mimarisi</h3></div>\n    <table class='cmp-table'><tr><th>Katman</th><th>Teknoloji</th><th>Görev</th></tr><tr><td>Veri</td><td>SQLite3</td><td>Görevleri kalıcı sakla</td></tr><tr><td>Mantık</td><td>Python sınıfları</td><td>CRUD, filtreleme, istatistik</td></tr><tr><td>Log</td><td>logging</td><td>Her işlemi kayıt altına al</td></tr><tr><td>Test</td><td>unittest</td><td>Kritik fonksiyonları doğrula</td></tr><tr><td>Export</td><td>JSON / CSV</td><td>Veriyi dışarıya aktar</td></tr></table>\n    <div class=\"code-block runnable\"><div class=\"cb-header\"><div class=\"cb-dots\"></div><span class=\"cb-label\">gorev_yoneticisi.py</span><span class=\"cb-run-tag\">▶</span></div><div class=\"cb-body\"><span class=\"kw\">import</span> sqlite3, json, logging, re<br><span class=\"kw\">from</span> datetime <span class=\"kw\">import</span> datetime<br><br>logging.<span class=\"fn\">basicConfig</span>(level=logging.<span class=\"fn\">INFO</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;format=<span class=\"st\">\"%(asctime)s [%(levelname)s] %(message)s\"</span>)<br>logger = logging.<span class=\"fn\">getLogger</span>(<span class=\"st\">\"görev_yönetici\"</span>)<br><br><span class=\"kw\">class</span> <span class=\"fn\">GorevYoneticisi</span>:<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">def</span> <span class=\"fn\">__init__</span>(<span class=\"kw\">self</span>, db=<span class=\"st\">\":memory:\"</span>):<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">self</span>.conn = sqlite3.<span class=\"fn\">connect</span>(db)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">self</span>.conn.<span class=\"fn\">row_factory</span> = sqlite3.<span class=\"fn\">Row</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">self</span>._<span class=\"fn\">tablo_olustur</span>()<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">def</span> <span class=\"fn\">_tablo_olustur</span>(<span class=\"kw\">self</span>):<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">self</span>.conn.<span class=\"fn\">execute</span>(\"\"\"<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CREATE TABLE IF NOT EXISTS gorevler (<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id INTEGER PRIMARY KEY AUTOINCREMENT,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;baslik TEXT NOT NULL,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;oncelik TEXT DEFAULT 'orta',<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;tamamlandi INTEGER DEFAULT 0,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;etiket TEXT DEFAULT '',<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;tarih TEXT<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\"\"\")<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">self</span>.conn.<span class=\"fn\">commit</span>()<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;logger.<span class=\"fn\">info</span>(<span class=\"st\">\"Veritabanı hazır\"</span>)</div><textarea class=\"cb-src\" style=\"display:none\">import sqlite3, json, logging, re, statistics\nfrom datetime import datetime\nlogging.basicConfig(level=logging.INFO, format=\"%(asctime)s [%(levelname)s] %(message)s\")\nlogger = logging.getLogger(\"gorev\")\nclass GorevYoneticisi:\n    def __init__(self, db=\":memory:\"):\n        self.conn = sqlite3.connect(db)\n        self.conn.row_factory = sqlite3.Row\n        self._tablo_olustur()\n    def _tablo_olustur(self):\n        self.conn.execute(\"\"\"\n            CREATE TABLE IF NOT EXISTS gorevler (\n                id INTEGER PRIMARY KEY AUTOINCREMENT,\n                baslik TEXT NOT NULL,\n                oncelik TEXT DEFAULT 'orta',\n                tamamlandi INTEGER DEFAULT 0,\n                etiket TEXT DEFAULT '',\n                tarih TEXT\n            )\n        \"\"\")\n        self.conn.commit()\n        logger.info(\"Veritabani hazir\")\n    def ekle(self, baslik, oncelik=\"orta\", etiket=\"\"):\n        self.conn.execute(\n            \"INSERT INTO gorevler(baslik,oncelik,etiket,tarih) VALUES(?,?,?,?)\",\n            (baslik, oncelik, etiket, datetime.now().isoformat())\n        )\n        self.conn.commit()\n        logger.info(f\"Gorev eklendi: {baslik}\")\n    def listele(self, sadece_bekleyen=False):\n        sorgu = \"SELECT * FROM gorevler\"\n        if sadece_bekleyen: sorgu += \" WHERE tamamlandi=0\"\n        return list(self.conn.execute(sorgu))\n    def tamamla(self, gorev_id):\n        self.conn.execute(\"UPDATE gorevler SET tamamlandi=1 WHERE id=?\", (gorev_id,))\n        self.conn.commit()\n        logger.info(f\"Gorev tamamlandi: #{gorev_id}\")\n    def ara(self, kelime):\n        return [g for g in self.listele() if kelime.lower() in g[\"baslik\"].lower()]\n    def istatistik(self):\n        gorevler = self.listele()\n        toplam = len(gorevler)\n        tamamlanan = sum(1 for g in gorevler if g[\"tamamlandi\"])\n        return {\"toplam\": toplam, \"tamamlanan\": tamamlanan, \"bekleyen\": toplam - tamamlanan}\n    def json_export(self):\n        return json.dumps([dict(g) for g in self.listele()], ensure_ascii=False, indent=2)\ng = GorevYoneticisi()\ng.ekle(\"Python ogren\", \"yuksek\", \"egitim\")\ng.ekle(\"Proje yaz\", \"yuksek\", \"is\")\ng.ekle(\"Kitap oku\", \"dusuk\", \"kisisel\")\ng.tamamla(1)\nprint(\"Istatistik:\", g.istatistik())\nprint(\"Arama:\", [dict(x) for x in g.ara(\"proje\")])</textarea></div>\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--green)\"></div><h3>CRUD Metodları + Arama + Export</h3></div>\n    <div class=\"code-block runnable\"><div class=\"cb-header\"><div class=\"cb-dots\"></div><span class=\"cb-label\">crud_arama.py</span><span class=\"cb-run-tag\">▶</span></div><div class=\"cb-body\">&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">def</span> <span class=\"fn\">ekle</span>(<span class=\"kw\">self</span>, baslik, oncelik=<span class=\"st\">\"orta\"</span>, etiket=<span class=\"st\">\"\"</span>):<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">self</span>.conn.<span class=\"fn\">execute</span>(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"st\">\"INSERT INTO gorevler(baslik,oncelik,etiket,tarih) VALUES(?,?,?,?)\"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(baslik, oncelik, etiket, datetime.<span class=\"fn\">now</span>().<span class=\"fn\">isoformat</span>())<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">self</span>.conn.<span class=\"fn\">commit</span>()<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;logger.<span class=\"fn\">info</span>(<span class=\"st\">f\"Görev eklendi: {baslik}\"</span>)<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">def</span> <span class=\"fn\">ara</span>(<span class=\"kw\">self</span>, kelime):<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"cm\"># Regex ile akıllı arama</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;pattern = re.<span class=\"fn\">compile</span>(kelime, re.<span class=\"fn\">IGNORECASE</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">return</span> [g <span class=\"kw\">for</span> g <span class=\"kw\">in</span> <span class=\"kw\">self</span>.<span class=\"fn\">listele</span>()<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">if</span> pattern.<span class=\"fn\">search</span>(g[<span class=\"st\">\"baslik\"</span>])]<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">def</span> <span class=\"fn\">istatistik</span>(<span class=\"kw\">self</span>):<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;gorevler = <span class=\"kw\">self</span>.<span class=\"fn\">listele</span>()<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;toplam = <span class=\"fn\">len</span>(gorevler)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;tamamlanan = <span class=\"fn\">sum</span>(<span class=\"nm\">1</span> <span class=\"kw\">for</span> g <span class=\"kw\">in</span> gorevler <span class=\"kw\">if</span> g[<span class=\"st\">\"tamamlandi\"</span>])<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">return</span> {<span class=\"st\">\"toplam\"</span>: toplam, <span class=\"st\">\"tamamlanan\"</span>: tamamlanan,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"st\">\"bekleyen\"</span>: toplam - tamamlanan}<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">def</span> <span class=\"fn\">json_export</span>(<span class=\"kw\">self</span>):<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">return</span> json.<span class=\"fn\">dumps</span>([<span class=\"fn\">dict</span>(g) <span class=\"kw\">for</span> g <span class=\"kw\">in</span> <span class=\"kw\">self</span>.<span class=\"fn\">listele</span>()],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ensure_ascii=<span class=\"kw\">False</span>, indent=<span class=\"nm\">2</span>)</div><textarea class=\"cb-src\" style=\"display:none\">import sqlite3, json, logging, re\nfrom datetime import datetime\nlogging.basicConfig(level=logging.WARNING)\nlogger = logging.getLogger(\"gorev\")\nclass GorevYoneticisi:\n    def __init__(self):\n        self.conn = sqlite3.connect(\":memory:\")\n        self.conn.row_factory = sqlite3.Row\n        self.conn.execute(\"CREATE TABLE gorevler (id INTEGER PRIMARY KEY AUTOINCREMENT, baslik TEXT, oncelik TEXT DEFAULT 'orta', tamamlandi INTEGER DEFAULT 0, tarih TEXT)\")\n        self.conn.commit()\n    def ekle(self, baslik, oncelik=\"orta\"):\n        self.conn.execute(\"INSERT INTO gorevler(baslik,oncelik,tarih) VALUES(?,?,?)\", (baslik, oncelik, datetime.now().isoformat()))\n        self.conn.commit()\n    def listele(self):\n        return list(self.conn.execute(\"SELECT * FROM gorevler\"))\n    def tamamla(self, gid):\n        self.conn.execute(\"UPDATE gorevler SET tamamlandi=1 WHERE id=?\", (gid,))\n        self.conn.commit()\n    def ara(self, kelime):\n        p = re.compile(kelime, re.IGNORECASE)\n        return [g for g in self.listele() if p.search(g[\"baslik\"])]\n    def istatistik(self):\n        gs = self.listele()\n        t = len(gs); c = sum(1 for g in gs if g[\"tamamlandi\"])\n        return {\"toplam\": t, \"tamamlanan\": c, \"bekleyen\": t - c}\n    def json_export(self):\n        return json.dumps([dict(g) for g in self.listele()], ensure_ascii=False, indent=2)\ng = GorevYoneticisi()\nfor baslik, onc in [(\"Async ogren\",\"yuksek\"),(\"Test yaz\",\"orta\"),(\"Kitap oku\",\"dusuk\"),(\"Proje bitir\",\"yuksek\")]:\n    g.ekle(baslik, onc)\ng.tamamla(1)\nprint(g.istatistik())\nprint(\"Arama:\", [dict(x) for x in g.ara(\"og\")])\nprint(g.json_export())</textarea></div>\n    <div class=\"section-h\"><div class=\"bar\" style=\"background:var(--amber)\"></div><h3>unittest ile Proje Testi</h3></div>\n    <div class=\"code-block runnable\"><div class=\"cb-header\"><div class=\"cb-dots\"></div><span class=\"cb-label\">proje_test.py</span><span class=\"cb-run-tag\">▶</span></div><div class=\"cb-body\"><span class=\"kw\">import</span> unittest<br><br><span class=\"kw\">class</span> <span class=\"fn\">GorevTestleri</span>(<span class=\"fn\">unittest</span>.<span class=\"fn\">TestCase</span>):<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">def</span> <span class=\"fn\">setUp</span>(<span class=\"kw\">self</span>):<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">self</span>.gy = <span class=\"fn\">GorevYoneticisi</span>()<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">self</span>.gy.<span class=\"fn\">ekle</span>(<span class=\"st\">\"Test görev\"</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">self</span>.gy.<span class=\"fn\">ekle</span>(<span class=\"st\">\"Başka görev\"</span>)<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">def</span> <span class=\"fn\">test_ekleme</span>(<span class=\"kw\">self</span>):<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">self</span>.<span class=\"fn\">assertEqual</span>(<span class=\"fn\">len</span>(<span class=\"kw\">self</span>.gy.<span class=\"fn\">listele</span>()), <span class=\"nm\">2</span>)<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">def</span> <span class=\"fn\">test_tamamlama</span>(<span class=\"kw\">self</span>):<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">self</span>.gy.<span class=\"fn\">tamamla</span>(<span class=\"nm\">1</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;stat = <span class=\"kw\">self</span>.gy.<span class=\"fn\">istatistik</span>()<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">self</span>.<span class=\"fn\">assertEqual</span>(stat[<span class=\"st\">\"tamamlanan\"</span>], <span class=\"nm\">1</span>)<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">def</span> <span class=\"fn\">test_arama</span>(<span class=\"kw\">self</span>):<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sonuc = <span class=\"kw\">self</span>.gy.<span class=\"fn\">ara</span>(<span class=\"st\">\"test\"</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"kw\">self</span>.<span class=\"fn\">assertEqual</span>(<span class=\"fn\">len</span>(sonuc), <span class=\"nm\">1</span>)<br><br><span class=\"kw\">if</span> __name__ == <span class=\"st\">\"__main__\"</span>:<br>&nbsp;&nbsp;&nbsp;&nbsp;unittest.<span class=\"fn\">main</span>(verbosity=<span class=\"nm\">2</span>)</div><textarea class=\"cb-src\" style=\"display:none\">import sqlite3, json, re, unittest\nfrom datetime import datetime\nclass GorevYoneticisi:\n    def __init__(self):\n        self.conn = sqlite3.connect(\":memory:\")\n        self.conn.row_factory = sqlite3.Row\n        self.conn.execute(\"CREATE TABLE gorevler (id INTEGER PRIMARY KEY AUTOINCREMENT, baslik TEXT, tamamlandi INTEGER DEFAULT 0)\")\n        self.conn.commit()\n    def ekle(self, baslik):\n        self.conn.execute(\"INSERT INTO gorevler(baslik) VALUES(?)\", (baslik,))\n        self.conn.commit()\n    def listele(self):\n        return list(self.conn.execute(\"SELECT * FROM gorevler\"))\n    def tamamla(self, gid):\n        self.conn.execute(\"UPDATE gorevler SET tamamlandi=1 WHERE id=?\", (gid,))\n        self.conn.commit()\n    def istatistik(self):\n        gs = self.listele()\n        t = len(gs); c = sum(1 for g in gs if g[\"tamamlandi\"])\n        return {\"toplam\": t, \"tamamlanan\": c, \"bekleyen\": t-c}\n    def ara(self, k):\n        return [g for g in self.listele() if k.lower() in g[\"baslik\"].lower()]\nclass GorevTestleri(unittest.TestCase):\n    def setUp(self):\n        self.gy = GorevYoneticisi()\n        self.gy.ekle(\"Test gorev\")\n        self.gy.ekle(\"Baska gorev\")\n    def test_ekleme(self):\n        self.assertEqual(len(self.gy.listele()), 2)\n    def test_tamamlama(self):\n        self.gy.tamamla(1)\n        self.assertEqual(self.gy.istatistik()[\"tamamlanan\"], 1)\n    def test_arama(self):\n        self.assertEqual(len(self.gy.ara(\"test\")), 1)\nunittest.main(verbosity=2)</textarea></div>\n    <div class=\"box tip\"><span class=\"box-icon\">💡</span><span><strong>Bu projeyi genişlet:</strong> CLI arayüzü ekle (argparse). tkinter ile GUI yap. async ile uzak API'den görev çek. cProfile ile yavaş sorguları bul. Gerçek dosyaya kaydedip uygulama olarak dağıt.</span></div>\n    <div class=\"box deep\"><span class=\"box-icon\">🧠</span><span><strong>M8 tamamlandı — ne öğrendin?</strong> Async/await I/O verimliliği, threading ve multiprocessing, unittest ile güvenli değişim, logging ile izlenebilirlik, SQLite ile kalıcı veri, regex ile metin işleme, web scraping ve API, metaprogramlama, veri analizi, GUI ve oyun geliştirme, generatörler ile bellek verimliliği. Python'un ileri düzey ekosistemi artık eliminde.</span></div>\n    <div class=\"lesson-nav\"><button class=\"nav-btn go\" onclick=\"switchPhase(1)\">🧠 Teste Geç →</button></div>\n  </div>",
      "quiz": [
        {
          "q": "Neden proje testleri her modülü ayrı değil birlikte test eder?",
          "opts": [
            "Daha hızlı",
            "Integration test: parçalar doğru çalışsa da birleşince hata olabilir — arayüz uyumsuzluğu",
            "Daha az kod",
            "Zorunlu"
          ],
          "ans": 1,
          "exp": "Unit test: her fonksiyon izole. Integration test: birden fazla parçanın birlikte çalışması. Gerçek projelerde ikisi de gerekli — ekle() çalışır, listele() çalışır ama beraber çalışınca bug olabilir."
        },
        {
          "q": "conn.row_factory = sqlite3.Row neden kullanıldı?",
          "opts": [
            "Hız",
            "Satırlara dict gibi isimle erişim — g['baslik'] gibi, tuple index yerine",
            "Güvenlik",
            "Zorunlu"
          ],
          "ans": 1,
          "exp": "row_factory = sqlite3.Row ile sorgu sonuçları dict benzeri nesne döner. satir['baslik'], satir['oncelik'] gibi isimle erişim — satir[0], satir[1] yerine okunabilir kod."
        },
        {
          "q": "logging modülü bu projede ne sağlıyor?",
          "opts": [
            "Hata önler",
            "Her önemli işlemi zaman damgasıyla kaydeder — sorun çıkınca ne olduğunu izleme imkânı",
            "Hız",
            "Test yerine"
          ],
          "ans": 1,
          "exp": "Görev eklenince INFO, tamamlanınca INFO, hata olunca ERROR loglanıyor. Production'da log dosyasına yazılabilir. Kullanıcı 'görevim nerede?' diye sorunca loglar cevaplayabilir."
        },
        {
          "q": "json.dumps ile JSON export neden önemli?",
          "opts": [
            "Sıkıştırma",
            "Veri taşınabilirliği — başka uygulama, dil veya sistem okuyabilir, yedekleme",
            "Şifreleme",
            "Görselleştirme"
          ],
          "ans": 1,
          "exp": "SQLite .db dosyası binary — başka sistemler okuyamaz. JSON export: insan okunabilir, herhangi dil parse edebilir, API response olarak gönderilebilir, başka araçlara aktarılabilir."
        },
        {
          "q": "setUp() her testte neden taze GorevYoneticisi oluşturuyor?",
          "opts": [
            "Zorunlu",
            "Test izolasyonu — bir testteki veri diğerini etkilemesin, temiz başlangıç garantisi",
            "Hız",
            "Bellek tasarrufu"
          ],
          "ans": 1,
          "exp": "Test 1: ekledi, tamamladı. Test 2 de aynı DB'yi görse önceki veriler karışabilir. setUp ile her test taze :memory: DB alır — izole, tekrarlanabilir, birbirinden bağımsız."
        }
      ],
      "fills": [
        {
          "code": "<span class=\"kw\">self</span>.conn = sqlite3.<input class=\"blank\" data-ans=\"connect\" placeholder=\"?\" style=\"width:60px\">(<span class=\"st\">\":memory:\"</span>)",
          "hint": "Bağlantı fonksiyonu"
        },
        {
          "code": "<span class=\"kw\">self</span>.conn.<input class=\"blank\" data-ans=\"row_factory\" placeholder=\"?\" style=\"width:95px\"> = sqlite3.<span class=\"fn\">Row</span>",
          "hint": "Dict erişim için"
        },
        {
          "code": "logger.<input class=\"blank\" data-ans=\"info\" placeholder=\"?\" style=\"width:42px\">(<span class=\"st\">\"Görev eklendi\"</span>)",
          "hint": "Bilgi seviyesi log"
        },
        {
          "code": "kw = json.<input class=\"blank\" data-ans=\"dumps\" placeholder=\"?\" style=\"width:50px\">(veri, indent=<span class=\"nm\">2</span>)",
          "hint": "JSON'a çevirme"
        },
        {
          "code": "<span class=\"kw\">self</span>.<input class=\"blank\" data-ans=\"assertEqual\" placeholder=\"?\" style=\"width:90px\">(istat[<span class=\"st\">\"toplam\"</span>], <span class=\"nm\">3</span>)",
          "hint": "Eşitlik testi"
        }
      ],
      "drag": [
        {
          "code": "self.conn = sqlite3.<span class=\"hl\">___</span>(':memory:')",
          "ans": "connect",
          "opts": [
            "connect",
            "open",
            "create",
            "init",
            "start"
          ],
          "exp": "connect(':memory:') RAM'de geçici DB — test için ideal"
        },
        {
          "code": "self.conn.<span class=\"hl\">___</span> = sqlite3.Row",
          "ans": "row_factory",
          "opts": [
            "row_factory",
            "row_type",
            "cursor_mode",
            "fetch_type",
            "dict_mode"
          ],
          "exp": "row_factory=Row ile sütun ismiyle erişim sağlanır"
        },
        {
          "code": "logger.<span class=\"hl\">___</span>('Gorev eklendi')",
          "ans": "info",
          "opts": [
            "info",
            "debug",
            "warning",
            "error",
            "critical"
          ],
          "exp": "info() normal işlem bilgisi — üretim loglarında görünür"
        },
        {
          "code": "json.<span class=\"hl\">___</span>(liste, ensure_ascii=False)",
          "ans": "dumps",
          "opts": [
            "dumps",
            "loads",
            "dump",
            "encode",
            "stringify"
          ],
          "exp": "dumps() Python nesnesini JSON string'e çevirir"
        },
        {
          "code": "self.<span class=\"hl\">___</span>(len(gorevler), 2)",
          "ans": "assertEqual",
          "opts": [
            "assertEqual",
            "assertTrue",
            "assertIn",
            "assertRaises",
            "assertIs"
          ],
          "exp": "assertEqual iki değerin eşit olduğunu doğrular"
        }
      ],
      "code": {
        "task": "GorevYoneticisi sınıfını kendi başına yaz. Gereksinimler: SQLite :memory: DB, ekle(baslik, oncelik) metodu, listele() metodu, tamamla(id) metodu, istatistik() metodu (toplam/tamamlanan/bekleyen). 3 görev ekle, birini tamamla, istatistikleri yazdır.",
        "starter": "import sqlite3\n\nclass GorevYoneticisi:\n    def __init__(self):\n        self.conn = sqlite3.connect(':memory:')\n        self.conn.row_factory = sqlite3.Row\n        self.conn.execute('''\n            CREATE TABLE gorevler (\n                id INTEGER PRIMARY KEY AUTOINCREMENT,\n                baslik TEXT NOT NULL,\n                oncelik TEXT DEFAULT 'orta',\n                tamamlandi INTEGER DEFAULT 0\n            )\n        ''')\n        self.conn.commit()\n    \n    def ekle(self, baslik, oncelik='orta'):\n        self.conn.execute(\n            'INSERT INTO gorevler(baslik, oncelik) VALUES(?, ?)',\n            (baslik, oncelik)\n        )\n        self.conn.commit()\n    \n    def listele(self):\n        return list(self.conn.execute('SELECT * FROM gorevler'))\n    \n    def tamamla(self, gorev_id):\n        self.conn.execute(\n            'UPDATE gorevler SET tamamlandi=1 WHERE id=?',\n            (gorev_id,)\n        )\n        self.conn.commit()\n    \n    def istatistik(self):\n        gorevler = self.listele()\n        toplam = len(gorevler)\n        tamamlanan = sum(1 for g in gorevler if g['tamamlandi'])\n        return {\n            'toplam': toplam,\n            'tamamlanan': tamamlanan,\n            'bekleyen': toplam - tamamlanan\n        }\n\n# Test\ngy = GorevYoneticisi()\ngy.ekle('Python ogren', 'yuksek')\ngy.ekle('Proje tamamla', 'yuksek')\ngy.ekle('Kitap oku', 'dusuk')\ngy.tamamla(1)\n\nprint('Gorevler:')\nfor g in gy.listele():\n    durum = 'TAMAM' if g['tamamlandi'] else 'BEKLIYOR'\n    print(f'  [{durum}] {g[\"baslik\"]} ({g[\"oncelik\"]})')\n\nprint('\\nIstatistik:', gy.istatistik())",
        "checkFn": "(code)=>{const c=code;const p=(c.includes('class GorevYoneticisi')?1:0)+(c.includes('sqlite3.connect')?1:0)+(c.includes('def ekle')?2:0)+(c.includes('def listele')?1:0)+(c.includes('def tamamla')?2:0)+(c.includes('def istatistik')?1:0)+(c.includes('tamamlandi')?1:0)+((c.match(/print/g)||[]).length>=2?1:0);return{pts:Math.min(p,10),max:10,ok:p>=6,msg:p>=8?'M8 Tamamlandı! 🏆 Harika iş!':p>=6?'Çok iyi proje!':'Tüm metodları (ekle, listele, tamamla, istatistik) yaz.'};",
        "hint": "SQLite INSERT/SELECT/UPDATE ile 4 metod. istatistik: sum(1 for g in listele() if g['tamamlandi'])"
      }
    }
  }
]
};
