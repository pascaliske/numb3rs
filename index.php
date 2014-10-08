<?php
	/**
	 * Project: {package-name}
	 */
	require('config.php');
	require('classes/core.class.php');
	foreach (glob('classes/*.subclass.php') as $class) {
		require $class;
	}

	$core = new core();
?>
<!DOCTYPE html>
<html>
	<head>
		<title>Numb3rs</title>

		<meta charset="utf-8" />

		<meta name="viewport"  content="width=device-width, height=device-height, initial-scale=0.8, user-scalable=1" />

		<link rel="stylesheet" type="text/css" href="main.min.css" />
		<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
		<script type="text/javascript" src="scripts/main.js"></script>
	</head>
	<body>
		<?php
			echo "<pre>";
			print_r($core -> grid);
			echo "</pre>";
		?>
		<div id="hint" class="btn">Hint</div>
		<table cellpadding="0" id="grid">
			<tr id="r0" class="row">
				<td id="00" class="square">00</td>
				<td id="01" class="square">01</td>
				<td id="02" class="square">02</td>
				<td id="03" class="square">03</td>
				<td id="04" class="square">04</td>
				<td id="05" class="square">05</td>
				<td id="06" class="square">06</td>
				<td id="07" class="square">07</td>
				<td id="08" class="square">08</td>
				<td id="09" class="square">09</td>
			</tr>
			<tr id="r1" class="row">
				<td id="10" class="square">10</td>
				<td id="11" class="square">11</td>
				<td id="12" class="square">12</td>
				<td id="13" class="square">13</td>
				<td id="14" class="square">14</td>
				<td id="15" class="square">15</td>
				<td id="16" class="square">16</td>
				<td id="17" class="square">17</td>
				<td id="18" class="square">18</td>
				<td id="19" class="square">19</td>
			</tr>
			<tr id="r2" class="row">
				<td id="20" class="square">20</td>
				<td id="21" class="square">21</td>
				<td id="22" class="square">22</td>
				<td id="23" class="square">23</td>
				<td id="24" class="square">24</td>
				<td id="25" class="square">25</td>
				<td id="26" class="square">26</td>
				<td id="27" class="square">27</td>
				<td id="28" class="square">28</td>
				<td id="29" class="square">29</td>
			</tr>
			<tr id="r3" class="row">
				<td id="30" class="square">30</td>
				<td id="31" class="square">31</td>
				<td id="32" class="square">32</td>
				<td id="33" class="square">33</td>
				<td id="34" class="square">34</td>
				<td id="35" class="square">35</td>
				<td id="36" class="square">36</td>
				<td id="37" class="square">37</td>
				<td id="38" class="square">38</td>
				<td id="39" class="square">39</td>
			</tr>
			<tr id="r4" class="row">
				<td id="40" class="square">40</td>
				<td id="41" class="square">41</td>
				<td id="42" class="square">42</td>
				<td id="43" class="square">43</td>
				<td id="44" class="square">44</td>
				<td id="45" class="square">45</td>
				<td id="46" class="square">46</td>
				<td id="47" class="square">47</td>
				<td id="48" class="square">48</td>
				<td id="49" class="square">49</td>
			</tr>
			<tr id="r5" class="row">
				<td id="50" class="square">50</td>
				<td id="51" class="square">51</td>
				<td id="52" class="square">52</td>
				<td id="53" class="square">53</td>
				<td id="54" class="square">54</td>
				<td id="55" class="square">55</td>
				<td id="56" class="square">56</td>
				<td id="57" class="square">57</td>
				<td id="58" class="square">58</td>
				<td id="59" class="square">59</td>
			</tr>
			<tr id="r6" class="row">
				<td id="60" class="square">60</td>
				<td id="61" class="square">61</td>
				<td id="62" class="square">62</td>
				<td id="63" class="square">63</td>
				<td id="64" class="square">64</td>
				<td id="65" class="square">65</td>
				<td id="66" class="square">66</td>
				<td id="67" class="square">67</td>
				<td id="68" class="square">68</td>
				<td id="69" class="square">69</td>
			</tr>
			<tr id="r7" class="row">
				<td id="70" class="square">70</td>
				<td id="71" class="square">71</td>
				<td id="72" class="square">72</td>
				<td id="73" class="square">73</td>
				<td id="74" class="square">74</td>
				<td id="75" class="square">75</td>
				<td id="76" class="square">76</td>
				<td id="77" class="square">77</td>
				<td id="78" class="square">78</td>
				<td id="79" class="square">79</td>
			</tr>
			<tr id="r8" class="row">
				<td id="80" class="square">80</td>
				<td id="81" class="square">81</td>
				<td id="82" class="square">82</td>
				<td id="83" class="square">83</td>
				<td id="84" class="square">84</td>
				<td id="85" class="square">85</td>
				<td id="86" class="square">86</td>
				<td id="87" class="square">87</td>
				<td id="88" class="square">88</td>
				<td id="89" class="square">89</td>
			</tr>
			<tr id="r9" class="row">
				<td id="90" class="square">90</td>
				<td id="91" class="square">91</td>
				<td id="92" class="square">92</td>
				<td id="93" class="square">93</td>
				<td id="94" class="square">94</td>
				<td id="95" class="square">95</td>
				<td id="96" class="square">96</td>
				<td id="97" class="square">97</td>
				<td id="98" class="square">98</td>
				<td id="99" class="square">99</td>
			</tr>
		</table>
		<script>
			$(document).ready(function() {
				$('#grid').numb3rs({

				});
			});
		</script>
	</body>
</html>