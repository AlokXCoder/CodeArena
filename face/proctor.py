import cv2
import mediapipe as mp
import time

from langchain_groq import ChatGroq


def start_ai_proctor():

    print("AI Proctor Started")

    llm = ChatGroq(
        model="llama-3.3-70b-versatile",
        api_key="your_api_key"
    )

    def ai_decision(data):

        prompt = f"""
        You are an AI exam proctor.

        warnings: {data['warnings']}
        face_missing: {data['face_missing']}
        look_away_events: {data['look_away_events']}
        duration: {data['duration']}

        Respond ONLY:
        ALLOW or WARN or REMOVE
        """

        response = llm.invoke(prompt)

        decision = response.content.strip().upper()

        return decision


    mp_face_mesh = mp.solutions.face_mesh
    face_mesh = mp_face_mesh.FaceMesh(max_num_faces=1)

    cap = cv2.VideoCapture(0)

    warning_count = 0
    face_missing_count = 0
    look_away_events = 0

    violation_start = None
    looking_away = False

    start_time = time.time()

    LOOK_AWAY_THRESHOLD = 3


    def detect_head_direction(landmarks):

        nose_x = landmarks[1].x
        nose_y = landmarks[1].y

        if nose_x < 0.4:
            return "LEFT"

        elif nose_x > 0.6:
            return "RIGHT"

        elif nose_y < 0.4:
            return "UP"

        elif nose_y > 0.6:
            return "DOWN"

        else:
            return "CENTER"


    while True:

        success, frame = cap.read()

        if not success:
            break

        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        results = face_mesh.process(rgb_frame)

        elapsed_time = int(time.time() - start_time)

        if results.multi_face_landmarks:

            landmarks = results.multi_face_landmarks[0].landmark

            direction = detect_head_direction(landmarks)

            cv2.putText(frame, f"Direction: {direction}",
                        (30, 50),
                        cv2.FONT_HERSHEY_SIMPLEX,
                        1,
                        (0,255,0),
                        2)

            if direction != "CENTER":

                if not looking_away:

                    violation_start = time.time()

                    looking_away = True


                duration = time.time() - violation_start


                if duration > LOOK_AWAY_THRESHOLD:

                    warning_count += 1

                    look_away_events += 1

                    violation_start = time.time()

            else:

                looking_away = False

        else:

            face_missing_count += 1

            warning_count += 1


        if elapsed_time % 5 == 0:

            decision = ai_decision({

                "warnings": warning_count,

                "face_missing": face_missing_count,

                "look_away_events": look_away_events,

                "duration": elapsed_time
            })

            print("AI Decision:", decision)

            if decision == "REMOVE":

                cv2.putText(frame,
                            "DISQUALIFIED",
                            (100,200),
                            cv2.FONT_HERSHEY_SIMPLEX,
                            2,
                            (0,0,255),
                            3)

                cv2.imshow("AI Proctor", frame)

                cv2.waitKey(3000)

                break


        cv2.putText(frame,
                    f"Warnings: {warning_count}",
                    (30,150),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    1,
                    (0,255,255),
                    2)

        cv2.imshow("AI Proctor", frame)


        if cv2.waitKey(1) & 0xFF == ord('q'):
            break


    cap.release()

    cv2.destroyAllWindows()