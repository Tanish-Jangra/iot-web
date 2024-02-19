<?php
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Origin: https://iot.mrmprocom.com");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require __DIR__ . '/classes/Database.php';
$db_connection = new Database();
$conn = $db_connection->dbConnection();

function msg($success, $status, $message, $extra = [])
{
    return array_merge([
        'success' => $success,
        'status' => $status,
        'message' => $message
    ], $extra);
}

$returnData = [];

if ($_SERVER["REQUEST_METHOD"] != "GET"):

    $returnData = msg(0, 404, 'Page Not Found!');

else:
    try {
        $email = isset($_GET['email']) ? $_GET['email'] : null;

        if ($email !== null) {
            $fetch_devices_by_email = "SELECT `device` FROM `userdevices` WHERE `email`=:email";
            $query_stmt = $conn->prepare($fetch_devices_by_email);
            $query_stmt->bindValue(':email', $email, PDO::PARAM_STR);
            $query_stmt->execute();

            if ($query_stmt->rowCount()):
                $returnData= $query_stmt->fetchAll(PDO::FETCH_ASSOC);
            else:
                $returnData=msg(0, 404, 'No entries found !');
            endif;
        } else {
            $returnData = msg(0, 404, 'Email not found in request url !');
        }

    } catch (PDOException $e) {
        $returnData = msg(0, 500, $e->getMessage());
    }

endif;

echo json_encode($returnData);