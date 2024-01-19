#include "painlessMesh.h"
#include <Arduino_JSON.h>

#define   MESH_PREFIX     "WSN Water Manager"
#define   MESH_PASSWORD   "12345678"
#define   MESH_PORT       5555

Scheduler userScheduler;
painlessMesh  mesh;

String readings;
void sendMessage() ;
String getReadings();
int pumpState = 0;
int pumpOn ;
int pumpOff ;
int nodeNumber = 2;
int relay = 12;
int percent;

Task taskSendMessage( TASK_SECOND * 1 , TASK_FOREVER, &sendMessage );

String getReadings () {
  JSONVar jsonReadings;
  jsonReadings["node"] = nodeNumber;
  jsonReadings["pumpState"] = pumpState;
  readings = JSON.stringify(jsonReadings);
  return readings;
}

void sendMessage() {
  String msg = getReadings();
  mesh.sendBroadcast(msg);
}

void receivedCallback( uint32_t from, String &msg ) {
  JSONVar myObject = JSON.parse(msg.c_str());
  int  node = myObject["node"];
  if (node == 1) {
    percent = myObject["waterPercent"];
  }
  if (node == 0) {
    pumpOn = myObject["pumpOn"];
    pumpOff = myObject["pumpOff"];
  }
  Serial.printf("Received from %u msg=%s\n", from, msg.c_str());
}

void setup() {
  Serial.begin(115200);
  pinMode(relay, OUTPUT);
  digitalWrite(relay, HIGH);
  //mesh.setDebugMsgTypes( ERROR | MESH_STATUS | CONNECTION | SYNC | COMMUNICATION | GENERAL | MSG_TYPES | REMOTE ); // all types on
  mesh.setDebugMsgTypes( ERROR | STARTUP );  // set before init() so that you can see startup messages

  mesh.init( MESH_PREFIX, MESH_PASSWORD, &userScheduler, MESH_PORT );
  mesh.onReceive(&receivedCallback);
  userScheduler.addTask( taskSendMessage );
  taskSendMessage.enable();
}

void loop() {
  mesh.update();
  if (pumpState = 0) {
    if (percent <= pumpOn) {
      digitalWrite(relay, LOW);
    }
  }

  if (pumpState = 1) {
    if (percent >= pumpOff) {
      digitalWrite(relay, HIGH);
    }
  }

}