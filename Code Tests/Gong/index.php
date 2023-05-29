<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta title="DEV TEST">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;600&display=swap" rel="stylesheet">
        <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css'>
        <link rel="stylesheet" href="/styles.css">
        <script src="https://code.jquery.com/jquery-3.7.0.min.js" integrity="sha256-2Pmvv0kuTBOenSvLm6bvfBSSHrUJ+3A7x6P5Ebd07/g=" crossorigin="anonymous"></script>
        <script src="/js/scripts.js"></script>
    </head>
    <?php
        $url = "http://localhost:8888/api";
        $client = curl_init($url);
        curl_setopt($client,CURLOPT_RETURNTRANSFER,true);
        $response = curl_exec($client);
        curl_close($client);
        $arr = json_decode($response, TRUE);
    ?>
    <body>
        <nav class="center__block">
            <select class="search__select">
                <option value="" selected>ALL COUNTRIES</option>
                <option value="France" >France</option>
                <option value="Germany" >Germany</option>
                <option value="United" >United States</option>
                <option value="Israel" >Israel</option>
                <option value="Japan" >Japan</option>
            </select>
            <div class="pos__rel">
                <input class="search__txt" type="text" placeholder="Search..."/>
                <i id="searchsubmit" class="fa fa-search"></i>
                <i id="clear" class="hide fa fa-times"></i>
            </div>
        </nav>
        <main>
            <section>
                <?php
                    foreach($arr as $key => $value) {
                        echo "<article data-locale=". $arr[$key]['country'] ."><p class='bold'>". $arr[$key]['first_name'] . " " . $arr[$key]['last_name'] . "<span><i class='fab fa-linkedin'></i></span></p><p> " . $arr[$key]['country'] ."</p><a href='mailto:" . $arr[$key]['email'] . "' title='Send Email'>" . $arr[$key]['email'] . "</a></article>";
                    }
                ?>
            </section>
        </main>
        <footer></footer>
    </body>
</html>