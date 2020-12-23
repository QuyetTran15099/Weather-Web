window.addEventListener('load' , ()=> {
    let long; // longitude :kinh độ
    let lat; //latitude: vĩ độ
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone =document.querySelector('.location-timezone');
    let  temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');



    if(navigator.geolocation){
        // hàm hỗ trợ khi load 1 trang và hiện 1 popup hỏi xem user có muốn allow xác định vị trí của mình hay k
        navigator.geolocation.getCurrentPosition(position => {
            //console.log(position);

            //lấy dữ liệu gắn vào 2 biến kinh độ và vĩ độ khi user đồng ý truy cập location
            long = position.coords.longitude;
            lat = position.coords.latitude;
            // call api nhưng không thể gọi tử localhost nên dùng froxy
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;
            
            fetch(api)
            .then(respone => {
                return respone.json();
            })
            .then(data =>{
                // console.log(data);
                //lấy dữ liệu thu đc từ api
                const { temperature,summary, icon }= data.currently;
                //đưa dữ liệu vào cây DOM để hiện thị
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone; 
                //TU DOI F SANG DO C
                let celsius = (temperature - 32) * (5/9);
                
                
                // set icon
                setIcons(icon, document.querySelector(".icon"));

                // Đổi từ độ F sang độ C
                temperatureSection.addEventListener("click" , () =>{
                    if(temperatureSpan.textContent === "F"){
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celsius);
                    }else{
                        temperatureSpan.textContent = "F"
                        temperatureDegree.textContent = temperature;
                    }
                })

            });
        });  
    }
    //https://darkskyapp.github.io/skycons/ 
    // đọc thêm để biết cách set icon
   function setIcons(icon, iconID){
        let skycons = new Skycons({color:"white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID,Skycons[currentIcon]);
   }
});