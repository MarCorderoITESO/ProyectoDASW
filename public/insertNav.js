"use strict";

mainNav.innerHTML = `<a class="navbar-brand" href="/home" id="logoNav">
                        <span class="noSelect"><span class="xvPink">XV</span><span class="appliedFontLight">ideos</span></span>
                    </a>
                    <button class="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                    aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="flex-grow-1">
                        <form class="form-inline my-2 my-lg-0 justify-content-end">
                            <input class="form-control col-sm-4 col-lg-2" type="text"
                                id="titleSearch" placeholder="Título">
                            <input class="form-control col-sm-4 col-lg-2" type="text"
                                id="categorySearch" placeholder="Categoría">
                            <input type="button" class="btn my-2 my-sm-0 ml-3 navBtn" id="searchNav" value="Buscar">
                            <a href="/profile" class="btn navBtn">
                                <i class="fas fa-user"></i>
                            </a>
                            <a href="/login" class="btn navBtn">
                                <i class="fas fa-sign-out-alt"></i>
                            </a>
                        </form>
                    </div>`;

searchNav.addEventListener("click", searchQuery);