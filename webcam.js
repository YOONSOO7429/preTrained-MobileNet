// Mobilenet 모델을 사용하여 웹캠에서 이미지를 분류
async function run() {
  // Mobilenet 모델을 로드
  const model = await mobilenet.load();

  // 웹캠 요소를 가져오고 웹캠 객체를 만들기
  const webcamElement = document.getElementById("webcam");
  const webcam = await tf.data.webcam(webcamElement);
  console.log("webcam 연결됨");

  // 웹캠에서 이미지를 캡처하고 분류하는 무한 루프를 실행
  while (true) {
    // 웹캠에서 이미지를 캡처
    const img = await webcam.capture();

    // Mobilenet 모델을 사용하여 이미지를 분류
    preds = await model.classify(img);

    // 분류 결과로 예측 텍스트를 업데이트
    document.getElementById("predictions").innerText = `prediction ${
      preds[0].className
    } \n probability: ${preds[0].probability.toFixed(4)}`;

    // 이미지 객체를 폐기
    img.dispose();
    // 웹캠에서 다음 프레임을 기다린다.
    await tf.nextFrame();
  }
}

document.addEventListener("DOMContentLoaded", run);
