parcelRequire=function(e){var r="function"==typeof parcelRequire&&parcelRequire,n="function"==typeof require&&require,i={};function u(e,u){if(e in i)return i[e];var t="function"==typeof parcelRequire&&parcelRequire;if(!u&&t)return t(e,!0);if(r)return r(e,!0);if(n&&"string"==typeof e)return n(e);var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}return u.register=function(e,r){i[e]=r},i=e(u),u.modules=i,u}(function (require) {var q,y,k,j;y=.3,q=function(){var $,a,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,x=arguments.length>1&&void 0!==arguments[1]?arguments[1]:.05,z=arguments.length>2&&void 0!==arguments[2]?arguments[2]:220,v=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,h=arguments.length>5&&void 0!==arguments[5]?arguments[5]:.1,e=arguments.length>6&&void 0!==arguments[6]?arguments[6]:0,r=arguments.length>7&&void 0!==arguments[7]?arguments[7]:1,o=arguments.length>8&&void 0!==arguments[8]?arguments[8]:0,f=arguments.length>9&&void 0!==arguments[9]?arguments[9]:0,i=arguments.length>10&&void 0!==arguments[10]?arguments[10]:0,V=arguments.length>11&&void 0!==arguments[11]?arguments[11]:0,d=arguments.length>12&&void 0!==arguments[12]?arguments[12]:0,J=arguments.length>13&&void 0!==arguments[13]?arguments[13]:0,U=arguments.length>14&&void 0!==arguments[14]?arguments[14]:0,g=arguments.length>15&&void 0!==arguments[15]?arguments[15]:0,l=arguments.length>16&&void 0!==arguments[16]?arguments[16]:0,M=arguments.length>17&&void 0!==arguments[17]?arguments[17]:1,R=arguments.length>18&&void 0!==arguments[18]?arguments[18]:0,s=arguments.length>19&&void 0!==arguments[19]?arguments[19]:0,w=2*Math.PI,u=o*=500*w/Math.pow(j,2),c=(0<U?1:-1)*w/4,p=z*=(1+2*x*Math.random()-x)*w/j,X=[],b=0,m=0,C=0,A=1,B=0,I=0,P=0;for(v=99+j*v,R*=j,n*=j,h*=j,l*=j,f*=500*w/Math.pow(j,3),U*=w/j,i*=w/j,V*=j,d=j*d|0,a=v+R+n+h+l|0;C<a;X[C++]=P)++I%(100*g|0)||(P=e?1<e?2<e?3<e?Math.sin(Math.pow(b%w,3)):Math.max(Math.min(Math.tan(b),1),-1):1-(2*b/w%2+2)%2:1-4*Math.abs(Math.round(b/w)-b/w):Math.sin(b),P=(d?1-s+s*Math.sin(2*Math.PI*C/d):1)*(0<P?1:-1)*Math.pow(Math.abs(P),r)*t*y*(C<v?C/v:C<v+R?1-(C-v)/R*(1-M):C<v+R+n?M:C<a-l?(a-C-l)/h*M:0),P=l?P/2+(l>C?0:(C<a-l?1:(a-C)/l)*X[C-l|0]/2):P),b+=($=(z+=o+=f)*Math.sin(m*U-c))-$*J*(1-1e9*(Math.sin(C)+1)%2),m+=$-$*J*(1-1e9*(Math.pow(Math.sin(C),2)+1)%2),A&&++A>V&&(z+=i,p+=i,A=0),!d||++B%d||(z=p,o=u,A=A||1);return(t=k.createBuffer(1,a,j)).getChannelData(0).set(X),(z=k.createBufferSource()).buffer=t,z.connect(k.destination),z.start(),z},k=new(window.AudioContext||webkitAudioContext),j=44100,window.zzfx=q;return{"xVUJ":{}};});