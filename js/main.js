
// 히어로 슬라이더 + 모바일 메뉴 + 상단이동 + 설치장소 탭
document.addEventListener('DOMContentLoaded',function(){
  var slides=document.querySelectorAll('.hero .slide');
  if(slides.length){
    var dotsWrap=document.querySelector('.hero .dots');
    var idx=0,timer;
    slides.forEach(function(_,i){
      var b=document.createElement('button');
      if(i===0)b.className='on';
      b.addEventListener('click',function(){go(i);reset();});
      dotsWrap.appendChild(b);
    });
    var dots=dotsWrap.querySelectorAll('button');
    function go(n){
      slides[idx].classList.remove('active');dots[idx].classList.remove('on');
      idx=(n+slides.length)%slides.length;
      slides[idx].classList.add('active');dots[idx].classList.add('on');
    }
    function reset(){clearInterval(timer);timer=setInterval(function(){go(idx+1)},6000);}
    document.querySelector('.hero .arrow.prev').addEventListener('click',function(){go(idx-1);reset();});
    document.querySelector('.hero .arrow.next').addEventListener('click',function(){go(idx+1);reset();});
    reset();
  }
  var mb=document.querySelector('.menu-btn');
  if(mb){mb.addEventListener('click',function(){document.querySelector('.gnb').classList.toggle('open');});}
  var tb=document.querySelector('.top-btn');
  if(tb){tb.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'});});}
  // 설치 가능 장소 탭 전환 (탭을 바꿀 때마다 콜아웃 애니메이션이 다시 재생됨)
  document.querySelectorAll('.install-tabs button').forEach(function(btn){
    btn.addEventListener('click',function(){
      var sec=btn.closest('section');
      sec.querySelectorAll('.install-tabs button').forEach(function(b){b.classList.remove('on')});
      sec.querySelectorAll('.install-viewer .scene').forEach(function(sc){sc.classList.remove('on')});
      btn.classList.add('on');
      var target=sec.querySelector('.install-viewer .scene[data-key="'+btn.dataset.key+'"]');
      void target.offsetWidth;
      target.classList.add('on');
    });
  });
  // 기능설명 이미지 모달
  var featureLinks=document.querySelectorAll('.icon-grid a[data-img],.icon-grid a[data-desc]');
  if(featureLinks.length){
    var modal=document.createElement('div');
    modal.className='feature-modal';
    modal.innerHTML='<button class="close" aria-label="닫기">&times;</button><img alt="기능 설명"><div class="txt"><h4></h4><p></p></div>';
    document.body.appendChild(modal);
    var mImg=modal.querySelector('img');
    var mTxt=modal.querySelector('.txt');
    var mTit=mTxt.querySelector('h4');
    var mDesc=mTxt.querySelector('p');
    featureLinks.forEach(function(a){
      a.addEventListener('click',function(e){
        e.preventDefault();
        if(a.dataset.img){
          mImg.src=a.dataset.img;
          modal.classList.remove('text-mode');
        }else{
          var sp=a.querySelector('span');
          mTit.innerHTML=sp?sp.innerHTML.replace(/<br\s*\/?>/gi,' '):'';
          mDesc.innerHTML=a.dataset.desc||'';
          modal.classList.add('text-mode');
        }
        modal.classList.add('open');
      });
    });
    modal.addEventListener('click',function(e){
      if(e.target!==mImg && !mTxt.contains(e.target)){modal.classList.remove('open');}
    });
    document.addEventListener('keydown',function(e){
      if(e.key==='Escape')modal.classList.remove('open');
    });
  }
  // 스크롤 등장 애니메이션
  var fades=document.querySelectorAll('.fade-up');
  if(fades.length && 'IntersectionObserver' in window){
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting){en.target.classList.add('show');io.unobserve(en.target);}
      });
    },{threshold:.25});
    fades.forEach(function(el){io.observe(el);});
  }else{
    fades.forEach(function(el){el.classList.add('show');});
  }
});

/* ---------- 메인 비상벨 모델 선택 (300 / 301) ---------- */
(function(){
  var sec = document.getElementById('bellModels');
  if(!sec) return;
  var panes = sec.querySelectorAll('.model-pane');
  sec.addEventListener('click', function(e){
    var btn = e.target.closest ? e.target.closest('.mp-item') : null;
    if(!btn) return;
    var key = btn.getAttribute('data-target');
    for(var i=0;i<panes.length;i++){
      panes[i].classList.toggle('on', panes[i].getAttribute('data-model') === key);
    }
  });
})();
