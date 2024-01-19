#include "painlessMesh.h"
#include <Arduino_JSON.h>

#define MESH_PREFIX "WSN Water Manager"
#define MESH_PASSWORD "12345678"
#define MESH_PORT 5555
#define LED_BUILTIN 2
#define SENSOR 14

int nodeNumber = 1;
const int trig = 4;
const int echo = 5;
long currentMillis = 0;
long previousMillis = 0;
int interval = 1000;
boolean ledState = LOW;
float calibrationFactor = 7.5;
volatile byte pulseCount;
byte pulse1Sec = 0;
double flowRate;
unsigned int flowMilliLitres;
double totalMilliLitres;
int percent;

void IRAM_ATTR pulseCounter(){
    pulseCount++;
}

Scheduler userScheduler;
painlessMesh mesh;
String readings;
void sendMessage();
String getReadings();

Task taskSendMessage(TASK_SECOND * 1, TASK_FOREVER, &sendMessage);

String getReadings(){
    JSONVar jsonReadings;
    jsonReadings["node"] = nodeNumber;
    jsonReadings["flowRate"] = flowRate;
    jsonReadings["totalMilliLitres"] = totalMilliLitres;
    jsonReadings["waterPercent"] = percent;
    readings = JSON.stringify(jsonReadings);
    return readings;
}

void sendMessage(){
    String msg = getReadings();
    mesh.sendBroadcast(msg);
}

// Needed for painless library
void receivedCallback(uint32_t from, String &msg){
    Serial.printf("Received from %u msg=%s\n", from, msg.c_str());
}

void setup(){
    Serial.begin(115200);

    pinMode(trig, OUTPUT);
    pinMode(echo, INPUT);

    pinMode(LED_BUILTIN, OUTPUT);
    pinMode(SENSOR, INPUT_PULLUP);

    pulseCount = 0;
    flowRate = 0.0;
    flowMilliLitres = 0;
    totalMilliLitres = 0;
    previousMillis = 0;

    attachInterrupt(digitalPinToInterrupt(SENSOR), pulseCounter, FALLING);

    mesh.setDebugMsgTypes(ERROR | STARTUP);

    mesh.init(MESH_PREFIX, MESH_PASSWORD, &userScheduler, MESH_PORT);
    mesh.onReceive(&receivedCallback);
    userScheduler.addTask(taskSendMessage);
    taskSendMessage.enable();
}

void loop(){
    mesh.update();

    currentMillis = millis();
    if (currentMillis - previousMillis > interval)
    {

        unsigned long duration; // biến đo thời gian
        int distance;           // biến lưu khoảng cách

        digitalWrite(trig, 0); // tắt chân trig
        delayMicroseconds(2);
        digitalWrite(trig, 1); // phát xung từ chân trig
        delayMicroseconds(5);  // xung có độ dài 5 microSeconds
        digitalWrite(trig, 0); // tắt chân trig

        duration = pulseIn(echo, HIGH);
        distance = int(duration / 2 / 29.412);

        percent = (19 - distance) / 0.19;

        pulse1Sec = pulseCount;
        pulseCount = 0;

        flowRate = ((1000.0 / (millis() - previousMillis)) * pulse1Sec) / calibrationFactor;
        previousMillis = millis();
        flowMilliLitres = (flowRate / 60) * 1000;
        totalMilliLitres += flowMilliLitres;
    }
}