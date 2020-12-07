<?php
defined('BASEPATH') or exit('No direct script access allowed');
?>
<!DOCTYPE html>
<html lang="en">
<?PHP $version = '1.1';?>
<head>
	<meta charset="utf-8">
	<title>Indonesia's MSRP Report</title>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
	<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==" crossorigin="" />
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/apexcharts/3.19.0/apexcharts.min.css" />
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">
	<link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;1,100;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" />
	<link href="<?PHP echo base_url() ?>/assets/style.css?v=<?PHP echo $version;?>" rel="stylesheet">

	<script src="https://code.jquery.com/jquery-3.5.0.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.min.js" integrity="sha384-w1Q4orYjBQndcko6MimVbzY0tgp4pWB4lZ7lr30WKz0vr/aWKhXdBNmNb5D92v7s" crossorigin="anonymous"></script>
	<script src="<?PHP echo base_url()?>assets/scrollify-master/jquery.scrollify.js"></script>
</head>

<body>

	<div id="fullpage">
		<div class="section" id="section1" data-section-name="section-1">
			<div class="container text-justify pt-3">
				<div class="float-left text-right w-100">
					<div class="logo-logo pt-2">
						<img class="logo-hdx mr-3" src="<?php echo base_url('assets/img/hdx.png'); ?>" />
					</div>
					<span class="text-right font-gov fw-500" style="color:#CCCCCC">Indonesia </span>
					<span class="text-right font-gov fw-500" style="color:#1EBFB3">Multisectoral Response Plan to </span></br>'
					<span class="text-right font-gov fw-500" style="color:#CCCCCC">COVID-19</span>
				</div>
				<div class="row" style="clear: both;">
					<div class="col-8  mt-5">
						<p class="fw-300">
						The COVID-19 pandemic is much more than a health crisis; it is a human crisis in every country in the world claiming many lives and threatening the health, social and economic spheres of society. Invariably, the pandemic will diminish social services, economic activities, financial resources and infrastructure and exacerbate people’s existing vulnerabilities including those of low income households with limited or no access to critical healthcare services and lack of safe and nutritious as well as affordable food, those of immunosuppressed people, women who have been at the frontline of the response, children, the elderly, people with disabilities, refugees without access to cash assistance and with limited livelihoods opportunities to support themselves, and migrant and informal sector workers. Those who will be hit hardest by the COVID-19 crisis are those already at risk of being left furthest behind: particularly the poorest and most marginalized communities where social inequalities may be further exacerbated and the risk of gender-based violence and sexual exploitation and abuse is escalated.
						</p>

						<p class="fw-300">
						Given the magnitude of the emergency, this COVID-19 Response Plan is a joint commitment by the Humanitarian Country Team (HCT) and the United Nations Country Team (UNCT) to support the Government of Indonesia, and covers a range of issues through a comprehensive multisectoral approach which, during the first six months of the emergency focuses on life-saving and early recovery activities. The multisectoral response plan is aligned with the WHO Strategic Preparedness and Response Plan, the Global Humanitarian Response Plan, and the UN Framework for the Immediate Socio economic Response to COVID-19. The plan will need regular updating to match the unique and evolving nature of this emergency with the most effective and appropriate activities. Full response plan document can be accessible in <a href="https://reliefweb.int/report/indonesia/indonesia-multi-sectoral-response-plan-covid-19-may-october-2020" target="_BLANK">here</a>.
						</p>
					</div>
					<div class="col-lg-4 col-md-4 col-sm-12 col-12 p-0">
						<div>
							<img class="cover-pic mr-3" src="<?php echo base_url('assets/img/msrp-cover.png'); ?>" />
							<!-- <div class="col-md-12 mapNote">Note: The visualisation is based on the number of reported COVID-19 cases at district level. Each point represents a person with red as Positive case. The location of each point does not represent actual location of the person.</div> -->
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="section" id="section11" data-section-name="section-11">
			<div class="container text-justify pt-4 px-5">
				<div class="row">
					<div class="col-md-12 mt-4 pt-3" id="text-line-indonesia">
						<div class="col-12 text-left pr-4 mb-4">
							<span class="fs-3">Situation Overview</span>
						</div>
						<div class="col-12 text-justify">
							<p class="fw-300">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pharetra tellus vel viverra efficitur. Vestibulum porttitor in orci eget sollicitudin. Donec magna arcu, venenatis sit amet mi in, vulputate accumsan nisl. Morbi vel lobortis metus, eget volutpat velit. Praesent ex enim, ornare id velit sed, vestibulum interdum sem. Nullam ante lectus, hendrerit id auctor et, molestie lacinia diam. Vestibulum turpis leo, semper ut sapien sed, malesuada feugiat risus. In eu diam faucibus, sodales arcu ac, fermentum ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse finibus pretium tortor. Fusce congue est nulla, in finibus massa tincidunt in. Integer nunc lectus, accumsan vel mauris a, viverra euismod nunc. In et ante eu urna mattis pretium. Suspendisse maximus aliquam ligula nec lobortis.
							</p>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-6 pt-3">
						<div class="fas fa-chart-area" style="color:#6CDBC7; font-size: 5.2rem; margin-bottom: 2rem;"></div>
						<h5>Number of Cases (National)</h5>
						<p class="fw-300">Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna.</p>
					</div>
					<div class="col-6 pt-3">
						<div class="fas fa-chart-line" style="color:#6CDBC7; font-size: 5.2rem; margin-bottom: 2rem;"></div>
						<h5>Number of Cases (Provincial)</h5>
						<p class="fw-300">Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna.</p>
					</div>
				</div>
			</div>
		</div>
		
		<div class="section" id="section2" data-section-name="section-2">
		<div class="container text-justify: center pt-4 px-5">
				<div class="row">
					<div class="col-md-12 mt-4 pt-3" id="text-line-indonesia">
						<div class="col-12 text-left pr-4 mb-4">
							<span class="fs-3">Priority areas</span>
							<p>Click on each areas for more detail information related to Partners’ Response Overview - Activities, Vulnerabilities, Gaps and Constraints.</p>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-3 pt-3" style="margin-bottom: 5rem">
						<div class="fa fa-stethoscope" style="color:#6CDBC7; font-size: 5.2rem; margin-bottom: 2rem"></div>
						<h6 class="margin-bottom: 2rem">Health</h6>
					</div>
					<div class="col-3 pt-3">
						<div class="fa fa-seedling" style="color:#6CDBC7; font-size: 5.2rem; margin-bottom: 2rem;"></div>
						<h6>Food security</h6>
					</div>
					<div class="col-3 pt-3">
						<div class="fas fa-truck" style="color:#6CDBC7; font-size: 5.2rem; margin-bottom: 2rem">
						</div>
						<h6>Logistics</h6>

					</div>
					<div class="col-3 pt-3">
						<div class="fas fa-comments" style="color:#6CDBC7; font-size: 5.2rem; margin-bottom: 2rem">
						</div>
						<h6>Risk communications and community engagement</h6>
					</div>
				</div>
				<div class="row">
					<div class="col-3 pt-3">
						<div class="fab fa-connectdevelop" style="color:#6CDBC7; font-size: 5.2rem; margin-bottom: 2rem">
						</div>
						<div style="margin-bottom: 5rem">
						<h6>Mitigate the socioeconomic impact of the crisis</h6></br>
						</div>
					</div>
					<div class="col-3 pt-3">
						<div class="fa fa-cogs" style="color:#6CDBC7; font-size: 5.2rem; margin-bottom: 2rem">
						</div>
						<h6>Critical multisectoral services</h6>
					</div>
					<div class="col-3 pt-3">
						<div class="fas fa-user-shield" style="color:#6CDBC7; font-size: 5.2rem; margin-bottom: 2rem">
						</div>
						<h6>Protection of vulnerable groups</h6>

					</div>
				</div>
			</div>
		</div>
		<div class="section" id="section3" data-section-name="section-3">
			<div class="container text-justify">
				<div class="row">
					<div class="col-lg-12 col-md-12 col-sm-12 col-12 mt-3">
						<div class="vertical-center">
							<p class=fw-300>
								<span class="fw-500 fs-3">Indicator - Indonesia Multisector Response Plan</span><br />
								On this page, we try to find the correlation between the baselining data phase two which shows how the provincial governments stored, updated and published their COVID-19 data and the COVID-19 daily cases data from kawalcovid by combining the two datasets into a chart. We chose three provinces such as West Java, North Sumatra and South Sulawesi as the sampling.
							</p>
						</div>
						<div class="legend-baseline float-right fs-08 fw-300 mb-3">
							<i class="fas fa-square box-blue-dark"></i> Daily Cases &nbsp;&nbsp; | &nbsp;&nbsp;
							<i class="fas fa-circle box-blue"></i> Data updated &nbsp;&nbsp;
							<i class="fas fa-circle box-cyan"></i> Data same as yesterday&nbsp;&nbsp;
							<i class="fas fa-circle box-sand"></i> HTML has changed&nbsp;&nbsp;
							<i class="fas fa-circle box-orange"></i> HTML hasn't been resolved&nbsp;&nbsp;
							<i class="fas fa-circle box-red"></i> Retrieval failed&nbsp;&nbsp;
						</div>
					</div>
					<div class="col-lg-12 col-md-12 col-sm-12 col-12 pr-0 three-prov-bar" id="covid-jabar-bar"></div>
					<div class="col-lg-12 col-md-12 col-sm-12 col-12 pr-0 three-prov-bar" id="covid-sumut-bar"></div>
					<div class="col-lg-12 col-md-12 col-sm-12 col-12 pr-0 three-prov-bar" id="covid-sulsel-bar"></div>
				</div>
			</div>
		</div>
		<div class="section" id="section4" data-section-name="section-4">
			<div class="container text-justify">
				<div class="row">
					<div class="col-lg-12 col-md-12 col-sm-12 col-12 mt-3">
						<div class="vertical-center">
							<p class=fw-300>
								<span class="fw-500 fs-3">Funding - Indonesia Multisector Response Plan</span><br />
								On this page, we try to find the correlation between the baselining data phase two which shows how the provincial governments stored, updated and published their COVID-19 data and the COVID-19 daily cases data from kawalcovid by combining the two datasets into a chart. We chose three provinces such as West Java, North Sumatra and South Sulawesi as the sampling.
							</p>
						</div>
						<div class="legend-baseline float-right fs-08 fw-300 mb-3">
							<i class="fas fa-square box-blue-dark"></i> Daily Cases &nbsp;&nbsp; | &nbsp;&nbsp;
							<i class="fas fa-circle box-blue"></i> Data updated &nbsp;&nbsp;
							<i class="fas fa-circle box-cyan"></i> Data same as yesterday&nbsp;&nbsp;
							<i class="fas fa-circle box-sand"></i> HTML has changed&nbsp;&nbsp;
							<i class="fas fa-circle box-orange"></i> HTML hasn't been resolved&nbsp;&nbsp;
							<i class="fas fa-circle box-red"></i> Retrieval failed&nbsp;&nbsp;
						</div>
					</div>
					<div class="col-lg-12 col-md-12 col-sm-12 col-12 pr-0 three-prov-bar" id="covid-jabar-bar"></div>
					<div class="col-lg-12 col-md-12 col-sm-12 col-12 pr-0 three-prov-bar" id="covid-sumut-bar"></div>
					<div class="col-lg-12 col-md-12 col-sm-12 col-12 pr-0 three-prov-bar" id="covid-sulsel-bar"></div>
				</div>	
			</div>
		</div>
		<div class="section" id="section5" data-section-name="section-5">
			<div class="container text-justify">
				<div class="row">
					<div class="col-lg-12 col-md-12 col-sm-12 col-12 mt-3">
						<div class="vertical-center">
							<p class=fw-300>
								<span class="fw-500 fs-3">Agencies Activities by Location</span><br />
								On this page, we try to find the correlation between the baselining data phase two which shows how the provincial governments stored, updated and published their COVID-19 data and the COVID-19 daily cases data from kawalcovid by combining the two datasets into a chart. We chose three provinces such as West Java, North Sumatra and South Sulawesi as the sampling.
							</p>
						</div>
						<div class="legend-baseline float-right fs-08 fw-300 mb-3">
							<i class="fas fa-square box-blue-dark"></i> Daily Cases &nbsp;&nbsp; | &nbsp;&nbsp;
							<i class="fas fa-circle box-blue"></i> Data updated &nbsp;&nbsp;
							<i class="fas fa-circle box-cyan"></i> Data same as yesterday&nbsp;&nbsp;
							<i class="fas fa-circle box-sand"></i> HTML has changed&nbsp;&nbsp;
							<i class="fas fa-circle box-orange"></i> HTML hasn't been resolved&nbsp;&nbsp;
							<i class="fas fa-circle box-red"></i> Retrieval failed&nbsp;&nbsp;
						</div>
					</div>
					<div class="col-lg-12 col-md-12 col-sm-12 col-12 pr-0 three-prov-bar" id="covid-jabar-bar"></div>
					<div class="col-lg-12 col-md-12 col-sm-12 col-12 pr-0 three-prov-bar" id="covid-sumut-bar"></div>
					<div class="col-lg-12 col-md-12 col-sm-12 col-12 pr-0 three-prov-bar" id="covid-sulsel-bar"></div>
				</div>	
			</div>
		</div>

		<!-- SECTION 7 -->
		<div class="section" id="section7" data-section-name="section-7">
			<div class="container text-justify pt-3">
				<div class="float-left text-right w-100">
					<div class="logo-logo pt-2">
						<img class="logo-hdx mr-3" src="<?php echo base_url('assets/img/hdx.png'); ?>" />
					</div>
					<span class="text-right font-gov fw-800" style="color:#1EBFB3">for feedback and comments </span>
				</div>
				<div class="row" style="clear: both;">
					<div class="col-md-12" style="margin-top:2rem">
						<p class="fw-300">
						This publication was produced by the United Nations Office for the Coordination of Humanitarian Affairs (OCHA), Centre for Humanitarian Data, The United Nations Resident Coordinator Office (RCO) and Pulse Lab Jakarta in collaboration with humanitarian and development partners in Indonesia. OCHA and RCO thank all organizations, partners and donors that contributed to the Multi Sectoral Response Plan to COVID-19.
						</p>
					</div>
				</div>
			</div>
		</div>

	</div>
	<div id="our_tooltip">this is tooltip</div>

	<script type="text/javascript" src="https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/apexcharts/3.19.0/apexcharts.min.js"></script>
	<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js" integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==" crossorigin=""></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/Turf.js/5.1.5/turf.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/6.2.0/d3.min.js"></script>
	<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>

	<script>
		const base_url = "<?PHP echo base_url() ?>";
		$(function() {
			$.scrollify({
				section: ".section",
				before: function(i, panels) {
					var ref = panels[i].attr("data-section-name");

					$(".pagination .active").removeClass("active");

					$(".pagination").find("a[href=\"#" + ref + "\"]").addClass("active");

					// alert($.scrollify.currentIndex());
					if ($.scrollify.currentIndex() == 0 || $.scrollify.currentIndex() == 2) {
						$(".pagination a").css("color", "#607D8B");
					} else {
						$(".pagination a").css("color", "#607D8B");
					}
				},
				afterRender: function() {

					var pagination = "<ul class=\"pagination\">";
					var activeClass = "";
					$(".section").each(function(i) {
						activeClass = "";
						if (i === $.scrollify.currentIndex()) {
							activeClass = "active";
						}
						pagination += "<li><a class=\"" + activeClass + "\" href=\"#" + $(this).attr("data-section-name") + "\"></a></li>";
						// pagination += "<li><a class=\"" + activeClass + "\" href=\"#" + $(this).attr("data-section-name") + "\"></a></li>";
					});

					pagination += "</ul>";

					$("#fullpage").append(pagination);
					$(".pagination a").on("click", $.scrollify.move);

					if ($.scrollify.currentIndex() == 0 || $.scrollify.currentIndex() == 2) {
						$(".pagination a").css("color", "#607D8B");
					} else {
						$(".pagination a").css("color", "#607D8B");
					}
				}
			});
		});
	</script>
	<script src="<?PHP echo base_url() ?>assets/script.js?v=<?PHP echo $version;?>"></script>
</body>

</html>